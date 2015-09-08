var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client){

  client.on('join', function(name) {
    console.log('Client ' + name + ' joined the chat...');
    client.name = name;
  });

  client.on('messages', function(data) {
    console.log(data);
    client.broadcast.emit('messages', client.name + ': ' + data;
    client.emit('messages', client.name + ': ' + data;
  });
});

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

server.listen(8080);
