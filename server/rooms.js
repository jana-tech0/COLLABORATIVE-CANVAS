const rooms = {};

function createRoom(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: new Map(),
    };
  }
}

function joinRoom(roomId, socket, user) {
  createRoom(roomId);
  rooms[roomId].users.set(socket, user);
}

function leaveRoom(roomId, socket) {
  rooms[roomId]?.users.delete(socket);
}

function getRoomUsers(roomId) {
  return Array.from(rooms[roomId]?.users.values() || []);
}

function broadcastToRoom(roomId, sender, message) {
  rooms[roomId]?.users.forEach((_, client) => {
    if (client !== sender && client.readyState === 1) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = {
  joinRoom,
  leaveRoom,
  getRoomUsers,
  broadcastToRoom,
};
