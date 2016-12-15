var axios = require('axios'),
    messageRestApiUrl = "http://localhost:8080";

function sendMessagesToSocket(currentSocket, messagesToSend) {
  currentSocket.emit('server:messages', {
    messages: messagesToSend
  });
}

module.exports = function(io) {
  var clients = [];

  io.on('connection', function(socket){
    console.info('New client connected (id=' + socket.id + ').');
    clients.push(socket);

    socket.emit('server:connected', {
      sessionId: socket.id
    });

    socket.on('client:join', function(msg){
      const username = msg.username;
      const channel = msg.channel;
      const sessionId = msg.sessionId;
      const organization = msg.organization;
      socket.join(channel);
      axios.get('/messages', {
        params: {
          organization: organization,
          channel: channel
        },
        method: 'get',
        baseURL: messageRestApiUrl,
      }).then(function (response) {
        sendMessagesToSocket(socket, response.data);
      }).catch(function (error) {
        console.log(error);
      });
    });

    socket.on('disconnect', function(){
      var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }
    });
  });
}
