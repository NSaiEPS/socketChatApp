// const { Socket } = require("dgram");
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
let connectedNum = 0;
let Clientmessage = "";
io.on("connection", (socket) => {
  //   console.log("a user connected ID is :", socket?.id);
  //   console.log("a user connected name is :", socket?.name);
  //   console.log("a user connected for ", ++connectedNum, "th time");

  socket.on("message", (input) => {
    // ...
    console.log("Input message is ", input);
    // Clientmessage = input;
    socket.emit("serverMessage", input);
    // io.emit("serverMessage", input);  will send messaes to all cliets that are coonected to this port
  });
});

server.listen(port, () => console.log("server running on ", port));
