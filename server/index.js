require('dotenv').config();

const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));
app.use(express.json());
app.use(router);

// Store for messages per room (in-memory message history)
const messageHistory = new Map();

// Store for typing indicators
const typingUsers = new Map();

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    // Initialize message history for room if not exists
    if (!messageHistory.has(user.room)) {
      messageHistory.set(user.room, []);
    }

    // Send welcome message
    const welcomeMessage = {
      user: 'System',
      text: `Welcome to ${user.room}!`,
      timestamp: new Date().toISOString()
    };
    socket.emit('message', welcomeMessage);
    socket.emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // Broadcast to room
    socket.broadcast.to(user.room).emit('message', {
      user: 'System',
      text: `${user.name} has joined the room.`,
      timestamp: new Date().toISOString()
    });
    socket.broadcast.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // Save message to history
    const history = messageHistory.get(user.room);
    if (history) {
      history.push(welcomeMessage);
      history.push({
        user: 'System',
        text: `${user.name} has joined the room.`,
        timestamp: new Date().toISOString()
      });
      // Keep only last 50 messages per room
      if (history.length > 50) {
        history.shift();
      }
    }

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      return;
    }

    const messageWithTimestamp = {
      user: user.name,
      text: message,
      timestamp: new Date().toISOString()
    };

    io.to(user.room).emit('message', messageWithTimestamp);

    // Add to message history
    const history = messageHistory.get(user.room);
    if (history) {
      history.push(messageWithTimestamp);
      if (history.length > 50) {
        history.shift();
      }
    }

    // Clear typing indicator for this user
    const typingKey = `${user.room}:${user.name}`;
    if (typingUsers.has(typingKey)) {
      typingUsers.delete(typingKey);
      socket.broadcast.to(user.room).emit('typing', {
        user: user.name,
        room: user.room,
        isTyping: false
      });
    }

    callback();
  });

  socket.on('typing', (data, callback) => {
    const user = getUser(socket.id);
    if (user) {
      const typingKey = `${user.room}:${user.name}`;
      if (data.isTyping) {
        typingUsers.set(typingKey, Date.now());
        socket.broadcast.to(user.room).emit('typing', {
          user: user.name,
          room: user.room,
          isTyping: true
        });
      } else {
        typingUsers.delete(typingKey);
        socket.broadcast.to(user.room).emit('typing', {
          user: user.name,
          room: user.room,
          isTyping: false
        });
      }
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'System',
        text: `${user.name} has left the room.`,
        timestamp: new Date().toISOString()
      });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      // Clean up typing indicator
      const typingKey = `${user.room}:${user.name}`;
      typingUsers.delete(typingKey);
      socket.broadcast.to(user.room).emit('typing', {
        user: user.name,
        room: user.room,
        isTyping: false
      });
    }

    console.log(`Connection closed: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}.`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
});
