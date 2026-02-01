import { joinRoom } from './websocket.js';

const user = {
  id: crypto.randomUUID(),
  name: 'User-' + Math.floor(Math.random() * 1000),
  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
};

joinRoom('room-1', user);
