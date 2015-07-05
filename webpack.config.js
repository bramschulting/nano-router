var webpack = require('webpack');

module.exports = {
  entry: {
    'nano-router': './src/NanoRouter.js'
  },
  output: {
    path: './build',
    filename: '[name].js',
    library: 'NanoRouter',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
