var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var proxy = require('express-http-proxy');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/v1/users', proxy('http://localhost:3000', {
  forwardPath: function(req, res) {
    return '/v1/users' + require('url').parse(req.url).path;
  }
}));

app.use('/v1/access_tokens', proxy('http://localhost:3000', {
  forwardPath: function(req, res) {
    console.log(require('url').parse(req.url).path);
    return '/v1/access_tokens' + require('url').parse(req.url).path;
  }
}));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8100, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:8100/');
});
