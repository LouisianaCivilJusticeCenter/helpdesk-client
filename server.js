/* eslint no-param-reassign: "off" */
require('dotenv').config({ silent: true });
const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const proxy = require('express-http-proxy');
const rp = require('request-promise');
const _ = require('underscore');
const url = require('url');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const API_SERVER_URL = process.env.API_SERVER_URL;
http.listen(process.env.SOCKET_PORT);

let rooms = [];

io.on('connection', socket => {
  socket.on('admin', () => {
    socket.username = 'admin';
    socket.firstName = 'Attorney';
    socket.lastName = 'General';
    socket.emit('updaterooms', rooms);
  });

  socket.on('adduser', (user) => {
    // console.log(user, 'this is user');
    socket.createdAt = new Date();
    socket.username = user.username;
    socket.firstName = user.first_name;
    socket.lastName = user.last_name;
    socket.room = user.id;
    if (!_.findWhere(rooms, { roomId: user.id })) {
      rooms.push({
        username: socket.username,
        firstName: socket.firstName,
        lastName: socket.lastName,
        roomId: socket.room,
        category: user.category,
        createdAt: socket.createdAt,
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
    console.warn('this is newroom on switch', newroom);
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
      .emit('updatechat', 'SERVER', `${socket.username} has joined this room`);
    socket.emit('updaterooms', rooms);
  });
  //
  socket.on('disconnect', () => {
    io.sockets.in(socket.room).emit('updatechat', 'SERVER', `${socket.username} has disconnected`);
    // socket.broadcast.emit('updatechat', 'SERVER', `${socket.username} has disconnected`);
    socket.leave(socket.room);
    if (socket.username !== 'admin') {
      rooms = _.reject(rooms, room => room.username === socket.username);
    }
    io.sockets.emit('updaterooms', rooms);
  });
});

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/v1/users', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/users${url.parse(req.url).path}`,
}));

app.use('/v1/users', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/users${url.parse(req.url).path}`,
}));

app.use('/v1/access_tokens', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/access_tokens${url.parse(req.url).path}`,
}));

app.use('/v1/messages', proxy(API_SERVER_URL, {
  forwardPath: (req) => `/v1/messages${url.parse(req.url).path}`,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.warn(`Listening at ${process.env.PORT}`);
});
