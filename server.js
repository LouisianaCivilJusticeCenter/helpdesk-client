const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config');
const proxy = require('express-http-proxy');


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
http.listen(8080, '127.0.0.1');

io.on('connection', function (socket) {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8100, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Listening at http://localhost:8100/');
});
