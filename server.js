/* eslint no-param-reassign: "off" */
/* eslint camelcase: "off" */

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
const USERNAME = process.env.USERNAME || 'admin';

const renderUnavailableMessage = 'We are currently unavailable';
const renderDisconnectedMessage = `Attorney has disconnected. If the conversation was not finished, 
this is most likely due to an internet connectivity problem. You may finish your conversation over 
the phone by calling 1-800-310-7029 and indicating that you received assistance through the virtual 
helpdesk.`;

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

server.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  console.warn(`Listening at ${process.env.PORT}`);
});

io.on('connection', socket => {
  socket.on('admin', () => {
    socket.username = USERNAME;
    socket.first_name = 'Attorney';
    socket.last_name = 'General';
    socket.emit('updaterooms', rooms);
  });

  socket.on('adduser', (user, clientToken) => {
    socket.createdAt = new Date();
    socket.username = user.username;
    socket.first_name = user.first_name;
    socket.last_name = user.last_name;
    socket.room = user.id;
    socket.clientToken = clientToken;
    if (!_.findWhere(rooms, { roomId: user.id })) {
      rooms.push({
        username: socket.username,
        first_name: socket.first_name,
        last_name: socket.last_name,
        roomId: socket.room,
        createdAt: socket.createdAt,
        category: user.category,
        clientToken,
      });
    }

    socket.join(user.id);
    // socket.emit('updatechat', 'SERVER', 'you have connected');
    io.sockets.in(socket.room).emit('updatechat', 'SERVER', `${socket.first_name} has connected`);
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
        from_first_name: socket.first_name,
        from_last_name: socket.last_name,
        body: data,
        room_id: socket.room,
      },
      json: true,
    };

    rp(options)
      .then(parsedBody => console.warn(parsedBody))
      .catch(err => console.warn(err));

    io.sockets.in(socket.room).emit('updatechat', socket.first_name, data);
  });

  socket.on('unavailable', roomId =>
    io.sockets.in(roomId).emit('updatechat', socket.first_name, renderUnavailableMessage));

  socket.on('switchRoom', newroom => {
    console.warn('Admin switching rooms');
    // const oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    const user_first_name = _.findWhere(rooms, { roomId: newroom }).first_name || 'anonymous';
    socket.emit('updatechat', 'SERVER', `you have connected to ${user_first_name}`, newroom);
    // socket
    //   .broadcast
    //   .to(oldroom)
    //   .emit('updatechat', 'SERVER', `${socket.username} has left this room`);
    socket.room = newroom;
    socket
      .broadcast
      .to(newroom)
      .emit('updatechat', 'SERVER', `${socket.first_name} has joined this room`);
    socket.emit('updaterooms', rooms);
  });

  socket.on('sign-out', () => {
    io.sockets.in(socket.room).emit('sign-out', socket.clientToken);
    io.sockets.emit('updaterooms', rooms);
  });

  socket.on('disconnect', () => {
    if (socket.first_name === 'Attorney') {
      io.sockets
        .in(socket.room)
        .emit('updatechat', 'SERVER', renderDisconnectedMessage);
    } else {
      io.sockets
        .in(socket.room)
        .emit('updatechat', 'SERVER', `${socket.first_name} has disconnected`);
    }

    // socket.broadcast.emit('signout', 'SERVER', `${socket.username} has disconnected`);
    socket.leave(socket.room);
    if (socket.username !== USERNAME) {
      rooms = _.reject(rooms, room => room.username === socket.username);
    }
    io.sockets.emit('updaterooms', rooms);
  });
});
