/* eslint no-param-reassign: "off" */
require('dotenv').config({ silent: true });
const http = require('http');
const express = require('express');

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const app = express();

const path = require('path');
const proxy = require('express-http-proxy');
const rp = require('request-promise');
const _ = require('underscore');
const url = require('url');

const PORT = process.env.PORT || 8090;
const API_SERVER_URL = process.env.API_SERVER_URL;
// http.listen(process.env.SOCKET_PORT);

let rooms = [];


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/v1/users', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/users${url.parse(req.url).path}`,
}));

app.use('/v1/access_tokens', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/access_tokens${url.parse(req.url).path}`,
}));

app.use('/v1/messages', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/messages${url.parse(req.url).path}`,
}));

app.use('/v1/mailer', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/mailer${url.parse(req.url).path}`,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = new http.Server(app);
const io = require('socket.io')(server);

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.warn(`Listening at ${process.env.PORT}`);
});

io.on('connection', socket => {
  socket.on('admin', () => {
    socket.username = 'admin';
    socket.firstName = 'Attorney';
    socket.lastName = 'General';
    socket.emit('updaterooms', rooms);
  });

  socket.on('adduser', (user, token) => {
    socket.createdAt = new Date();
    socket.username = user.username;
    socket.firstName = user.first_name;
    socket.lastName = user.last_name;
    socket.room = user.id;
    socket.clientToken = token;
    if (!_.findWhere(rooms, { roomId: user.id })) {
      rooms.push({
        username: socket.username,
        firstName: socket.firstName,
        lastName: socket.lastName,
        roomId: socket.room,
        category: user.category,
        createdAt: socket.createdAt,
        clientToken: token,
      });
    }

    socket.join(user.id);
    // socket.emit('updatechat', 'SERVER', 'you have connected');
    io.sockets.in(socket.room).emit('updatechat', 'SERVER', `${socket.firstName} has connected`);
    // socket
    //   .broadcast
    //   .to(user.id)
    //   .emit('updatechat', 'SERVER', `${user.username} has connected to this room`);
    io.sockets.emit('updaterooms', rooms);
  });

  socket.on('sendchat', data => {
    const options = {
      method: 'POST',
      uri: `${API_SERVER_URL}/v1/messages`,
      body: {
        from_id: socket.room,
        from_firstName: socket.firstName,
        from_lastName: socket.lastName,
        from_username: socket.username,
        body: data,
        room_id: socket.room,
      },
      json: true,
    };

    rp(options)
      .then(parsedBody => {
        console.warn(parsedBody);
      })
      .catch(err => {
        console.warn(err);
      });
    console.warn('inside sendchat');
    io.sockets.in(socket.room).emit('updatechat', socket.firstName, data);
  });

  socket.on('unavailable', roomId => {
    io.sockets.in(roomId).emit('updatechat', socket.username, 'We Are Currently Unavailable');
  });


  socket.on('switchRoom', newroom => {
    console.warn('Admin switching rooms');
    // const oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', `you have connected to ${newroom}`, newroom);
    // socket
    //   .broadcast
    //   .to(oldroom)
    //   .emit('updatechat', 'SERVER', `${socket.username} has left this room`);
    socket.room = newroom;
    socket
      .broadcast
      .to(newroom)
      .emit('updatechat', 'SERVER', 'Admin has joined this room');
    socket.emit('updaterooms', rooms);
  });

  socket.on('sign-out', () => {
    io.sockets.in(socket.room).emit('sign-out', socket.clientToken);
  });

  socket.on('disconnect', () => {
    io.sockets.in(socket.room).emit('updatechat', 'SERVER', `${socket.username} has disconnected`);
    // socket.broadcast.emit('signout', 'SERVER', `${socket.username} has disconnected`);
    socket.leave(socket.room);
    if (socket.username !== 'admin') {
      rooms = _.reject(rooms, room => room.username === socket.username);
    }
    io.sockets.emit('updaterooms', rooms);
  });
});
