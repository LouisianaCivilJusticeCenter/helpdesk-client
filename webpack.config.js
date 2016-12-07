module.exports = {
  entry: './app/main.jsx',
  output: {
    path: './app',
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: './app',
    port: 8100,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        rewrite: function rewrite(req) {
          req.url = req.url.replace(/^\/api/, '');
          console.log(req.url, 'this is req.url');
        },
      },
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
};
