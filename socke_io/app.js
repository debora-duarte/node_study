var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var redis = require('redis');
var redisClient = redis.createClient();

var storeMessage = function(name, data) {
  var message = JSON.stringify({ name: name, data: data });
  redisClient.lpush('messages', message, function(error, response){
    redisClient.ltrim('messages', 0, 9);
  });
}

var reloadMessages = function(client) {
  redisClient.lrange('messages', 0, -1, function(error, messages){
    messages = messages.reverse();
    messages.forEach( function(message){
      message = JSON.parse(message);
      client.emit('messages', message.name + ': ' + message.data);
    });  
  }); 
}

io.on('connection', function(client){

  client.on('join', function(name) {
    console.log('Client ' + name + ' joined the chat...');
    client.name = name;
    reloadMessages(client);
    redisClient.sadd('names', name);
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
