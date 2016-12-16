var axios = require('axios'),
    BASEURL = "https://tranquil-scrubland-57034.herokuapp.com/";

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
      const channel = msg.channel;
      const organization = msg.organization;
      socket.join(channel);
      axios.get('/messages', {
        params: {
          organization: organization,
          channel: channel
        },
        method: 'get',
        baseURL: BASEURL
      }).then(function (response) {
        sendMessagesToSocket(socket, response.data);
      }).catch(function (error) {
        console.log(error);
      });
    });

    socket.on('client:newMessage', function(msg) {
      axios({
          url: '/messages/new',
          params: {
            organization: msg.organization,
            channel: msg.channelName,
            message: msg.message,
            sender: msg.username
          },
          headers: {
            'Content-Type':'text/plain'
          },
          method: 'post',
          baseURL: BASEURL
        }).then(function (response) {
          sendMessagesToSocket(io.to(response.data.channel), response.data.messages);
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
