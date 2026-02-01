export const socket = new WebSocket("ws://localhost:3000");

export function joinRoom(roomId, user) {
  socket.send(JSON.stringify({
    type: "JOIN_ROOM",
    roomId,
    user
  }));
}