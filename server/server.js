const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

console.log('web socket server is running on the port 3000');

wss.on('connection', (ws) => {
  console.log('client is connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
});
