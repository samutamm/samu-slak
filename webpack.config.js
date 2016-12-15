var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  externals: {
    'Config': JSON.stringify({
      ORGANIZATION: process.env.ORGANIZATION || "samu", //Hard coded at the moment
      BASEURL: process.env.BASEURL || "http://localhost:8080",
      AUTH_URL: process.env.AUTH_URL || "http://localhost:3030"
    })
  }
};

module.exports = config;
