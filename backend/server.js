const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const rooms = {}; // Stores room data including code, language, and users

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("joinRoom", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = {
        code: "console.log('Hello, Monaco!');",
        language: "javascript",
        users: [],
      };
    }
    socket.join(roomId);
    rooms[roomId].users.push(username);
    io.to(roomId).emit("userList", rooms[roomId].users);
    socket.emit("codeUpdate", rooms[roomId].code);
    socket.emit("languageUpdate", rooms[roomId].language);
  });

  socket.on("codeUpdate", ({ roomId, code }) => {
    if (rooms[roomId]) {
      rooms[roomId].code = code;
      socket.to(roomId).emit("codeUpdate", code);
    }
  });

  socket.on("languageUpdate", ({ roomId, language }) => {
    if (rooms[roomId]) {
      rooms[roomId].language = language;
      socket.to(roomId).emit("languageUpdate", language);
    }
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId].users = rooms[roomId].users.filter(
        (user) => user !== socket.id
      );
      io.to(roomId).emit("userList", rooms[roomId].users);
    }
    console.log("A user disconnected: ", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
