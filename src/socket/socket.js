const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
dotenv.config();
const secret = process.env.JWTKEY;
const io = new Server(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const socketServer = () => {
  let activeUsers = [];

  io.use((socket, next) => {
    // Check if the socket has an auth token
    let token = socket.handshake.auth.token;
    console.log(token, "token");
    token = token.split(" ")[1];
    if (!token) {
      console.log(token, "hello");
      return next(new Error("Authentication error"));
    }

    // // Verify the token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err, "error");
        return next(new Error("Authentication error"));
      }

      // Attach the user id to the socket object
      socket.userId = decoded.userId;

      next();
    });
  });
  // io.on("connection", (socket) => {
  //   console.log(`User ${socket.userId} connected`);

  //   // Your socket event handlers here
  // });

  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId);
      console.log("Data: ", data);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });
};

module.exports = socketServer;
