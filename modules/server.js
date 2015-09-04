var http = require('http');

http.createServer(function(request, response){
  request.on('data', function(data){
    console.log(data.toString());
  });
  response.write('Hellooooooo!');
  response.end();
}).listen(8080);