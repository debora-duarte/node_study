var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];

var storeMessage = function(name, data) {
  messages.push({ name: name, data: data });
  if(messages.legth > 10) {
    messages.shift();
  }
}

var reloadMessages = function(client) {
  messages.forEach(function(message){
    client.emit('messages', message.name + ': ' + message.data);
  });
}

io.on('connection', function(client){

  client.on('join', function(name) {
    console.log('Client ' + name + ' joined the chat...');
    client.name = name;
    reloadMessages(client);
  });

  client.on('messages', function(data) {
    console.log(data);
    storeMessage(client.name, data);
    client.broadcast.emit('messages', client.name + ': ' + data);
    client.emit('messages', client.name + ': ' + data);
  });
});

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

server.listen(8080);
