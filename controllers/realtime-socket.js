const { getIO } = require("../config/socket");

let USERS = [];

const addUser = (socketID, userID) =>
  !USERS.some((user) => user.userID == userID) &&
  USERS.push({ socketID, userID });
const getUser = (userId) => USERS.find((user) => user.userID == userId);
const getUsers = (users) => users.map((user) => user.userID);

const socketConnection = (socket) => {
  // NOTE USERS
  socket.on("setup", (userId) => {
    addUser(socket.id, userId);
    getIO().emit("online users", getUsers(USERS));
  });
  socket.on("logout", (userId) => {
    getIO().emit(
      "online users",
      getUsers(USERS.filter((user) => user.userID != userId))
    );
  });

  // NOTE CHATS
  socket.on("add chat", ({ item, user, reciverId }) => {
    socket.to(getUser(reciverId)?.socketID).emit("new chat", { item, user });
  });
  socket.on("delete chat", (data) => {
    socket
      .to(getUser(data.friend._id || data.friend.id)?.socketID)
      .emit("deleted chat", data);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("leave chat", (room) => {
    socket.leave(room);
  });

  socket.on("typing", ({ room, isType }) => {
    socket.to(room).emit("typing", { isType, room });
  });

  // NOTE Messages
  socket.on("new message", ({ message, reciverId }) => {
    socket
      .to(getUser(reciverId)?.socketID)
      .emit("receive message", { message });
  });
  socket.on("delete message", ({ message, reciverId }) => {
    socket
      .to(getUser(reciverId)?.socketID)
      .emit("receive delete message", { message });
  });

  socket.on("disconnect", (reson) => {
    USERS = USERS.filter((user) => user.socketID != socket.id);
    getIO().emit("online users", getUsers(USERS));
    console.log(reson);
  });
};

module.exports = socketConnection;
