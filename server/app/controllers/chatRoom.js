
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
      socket.join(channel);
      //fetch messages and send to client
      socket.emit('server:messages', {
        messages: ['molo','kolo']
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
