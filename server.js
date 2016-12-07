const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use(express.static('./app'));
app.use('/v1/users', proxy("http://localhost:3000", {
  forwardPath: function(req, res) {
    console.log('inside v1 proxy');
    return '/v1/users';
  },
}));
app.listen(process.env.PORT || 8100);
