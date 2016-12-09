/**
 * If no NODE_ENV has been set load env variables from .env -file
 */
if (!process.env.NODE_ENV) {
  require("dotenv").config();
}

var express = require('./server/config/express')
    fs = require('fs'),
    http = require('http'),
    io = require('socket.io');

var app = express();

app.set('port', (process.env.PORT || 3000));


app.get('*', (req, res) => {
  res.sendFile('client/index.html', { root: __dirname });
});

const httpServer = http.Server(app);
const socketIO = io(httpServer);
require('./server/app/controllers/chatRoom.js')(socketIO);
var server = httpServer.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server started at http://localhost:%s', port);
});

module.exports = app;
