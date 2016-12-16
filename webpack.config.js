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
      BASEURL: process.env.BASEURL || "https://tranquil-scrubland-57034.herokuapp.com/",
      AUTH_URL: process.env.AUTH_URL || "https://person-api.herokuapp.com/"
    })
  }
};

module.exports = config;
