const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let board = { elements: [] };

io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.emit('board:update', board);

  socket.on('board:update', (data) => {
    if (data && data.elements) {
      board = data;
      socket.broadcast.emit('board:update', board);
    }
  });

  socket.on('disconnect', () => {
    console.log('client disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log('Socket.io server listening on', PORT));
