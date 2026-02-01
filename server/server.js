const WebSocket = require('ws');

const {
  joinRoom,
  leaveRoom,
  getRoomUsers,
  broadcastToRoom,
} = require('./rooms');

const wss = new WebSocket.Server({ port: 3000 });

console.log('web socket server is running on the port 3000');

wss.on('connection', (ws) => {
  console.log('client is connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'JOIN_ROOM') {
      ws.roomId = data.roomId;
      ws.user = data.user;

      joinRoom(data.roomId, ws, data.user);

      broadcastToRoom(ws.roomId, ws, {
        type: 'USER_JOINED',
        users: getRoomUsers(ws.roomId),
      });
    }

    if (data.type === 'STROKE') {
      // Broadcast to all OTHER clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on('close', () => {
    if (ws.roomId) {
      leaveRoom(ws.roomId, ws);
      broadcastToRoom(ws.roomId, ws, {
        type: 'USER_LEFT',
        users: getRoomUsers(ws.roomId),
      });
    }
  });
});
