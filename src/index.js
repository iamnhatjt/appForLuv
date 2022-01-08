const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("new user", (id) => {
    io.emit("new user", id);
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

httpServer.listen(3000);
