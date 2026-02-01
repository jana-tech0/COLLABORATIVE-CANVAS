const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

console.log('web socket server is running on the port 3000');

wss.on('connection', (ws) => {
  console.log('client is connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

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
    console.log('client disconnected');
  });
});
