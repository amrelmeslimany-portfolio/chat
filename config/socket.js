const socket = require("socket.io");
const { CLIENT_URL } = require("../utils/variables");

let io;

module.exports = {
  init: (server) => {
    io = socket(server, {
      cors: { origin: CLIENT_URL, credentials: true },
      transports: ["websocket"],
    });
    return io;
  },
  getIO: () => {
    if (!io) throw Error("Socket IO deosnt init");
    return io;
  },
};
