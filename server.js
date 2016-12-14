const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const proxy = require('express-http-proxy');


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const _ = require('underscore');
http.listen(8080, '127.0.0.1');

const usernames = {};

io.on('connection', socket => {
  socket.on('admin', () => {
    socket.emit('updaterooms');
  });

  socket.on('adduser', (user) => {
    socket.username = user.username;
    socket.room = user.id;
    usernames[user.username] = user.username;
    socket.join(user.id);
    socket.emit('updatechat', 'SERVER', 'you have connected');
    socket.broadcast.to(user.id).emit('updatechat', 'SERVER', user.username + ' has connected to this room');
    socket.emit('updaterooms');
  });

  socket.on('sendchat', data => {
    console.log('inside sendchat');
    io.sockets["in"](socket.room).emit('updatechat', socket.username, data, socket.room);
  });

  // socket.on('adduser', function(username, room) {
  //       socket.username = username;
  //       socket.room = room;
  //       usernames[username] = username;
  //       if (!rooms.includes(room)) {
  //         rooms.push(room)
  //       }
  //       socket.join(room);
  //       socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
  //       socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
  //       socket.emit('updaterooms', rooms, room);
  //   });
  //
  //   socket.on('sendchat', function(data) {
  //       io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
  //   });
  //
    socket.on('switchRoom', function(newroom) {
        var oldroom;
        oldroom = socket.room;
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
        socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        socket.emit('updaterooms');
    });
  //
  //   socket.on('disconnect', function() {
  //       delete usernames[socket.username];
  //       io.sockets.emit('updateusers', usernames);
  //       socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  //       socket.leave(socket.room);
  //   });
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8100, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening at http://localhost:8100/');
});
