var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path = require('path');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if(process.env.NODE_ENV === 'production') {
    app.use(compression()); //to zip response bodies
  }
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION
  }));

  const staticPath = path.join(__dirname, './../../client/');
  app.use('/', express.static(staticPath));

  require('../app/routes/hello.server.route')(app);

  return app;
}
