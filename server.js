/* eslint no-param-reassign: "off" */

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const proxy = require('express-http-proxy');
const rp = require('request-promise');
const _ = require('underscore');


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
http.listen(8080, '127.0.0.1');

const usernames = {};

let rooms = [];

io.on('connection', socket => {
  socket.on('admin', (username) => {
    socket.username = username;
    socket.emit('updaterooms', rooms);
  });

  socket.on('adduser', (user) => {
    socket.createdAt = new Date();
    socket.username = user.username;
    socket.room = user.id;
    if (!_.findWhere(rooms, { roomId: user.id })) {
      rooms.push({
        username: socket.username,
        roomId: socket.room,
        category: 'category',
        createdAt: socket.createdAt,
      });
    }

    usernames[user.username] = user.username;
    socket.join(user.id);
    socket.emit('updatechat', 'SERVER', 'you have connected');
    socket
      .broadcast
      .to(user.id)
      .emit('updatechat', 'SERVER', `${user.username} has connected to this room`);
    io.sockets.emit('updaterooms', rooms);
  });

  socket.on('sendchat', data => {
    const options = {
      method: 'POST',
      uri: 'http://localhost:3000/v1/messages',
      body: {
        from_id: socket.room,
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
    io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
  });

  socket.on('unavailable', roomId => {
    io.sockets["in"](roomId).emit('updatechat', socket.username, 'We Are Currently Unavailable');
  });


  socket.on('switchRoom', newroom => {
    let oldroom = null;
    console.warn('this is newroom on switch', newroom);
    oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', `you have connected to ${newroom}`, newroom);
    socket
      .broadcast
      .to(oldroom)
      .emit('updatechat', 'SERVER', `${socket.username} has left this room`);
    socket.room = newroom;
    socket
      .broadcast
      .to(newroom)
      .emit('updatechat', 'SERVER', `${socket.username} has joined this room`);
    socket.emit('updaterooms', rooms);
  });
  //
  socket.on('disconnect', function() {
    console.log('this is sicket.username', socket.username);
    console.log('this is disconnect');
    socket.broadcast.emit('updatechat', 'SERVER', `${socket.username} has disconnected`);
    socket.leave(socket.room);
    if (socket.username !== 'admin') {
      console.log('rooms before reject', rooms);
      rooms = _.reject(rooms, room => room.username === socket.username);
      console.log('rooms after reject', rooms);
    }
    io.sockets.emit('updaterooms', rooms);
  });
});

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/v1/users', proxy('http://localhost:3000', {
  forwardPath: function(req, res) {
    return '/v1/users' + require('url').parse(req.url).path;
  },
}));

app.use('/v1/access_tokens', proxy('http://localhost:3000', {
  forwardPath: function(req, res) {
    return '/v1/access_tokens' + require('url').parse(req.url).path;
  },
}));

app.use('/v1/messages', proxy('http://localhost:3000', {
  forwardPath: function(req, res) {
    return '/v1/messages' + require('url').parse(req.url).path;
  },
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8100, (err) => {
  if (err) {
    console.error(err);
  }
  console.warn('Listening at http://localhost:8100/');
});
