var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
  var newFile = fs.createWriteStream('news_copy.md');
  var fileBytes = request.headers['content-length'];
  var uploadedBytes = 0;

  request.on('readable', function(){
    var chunk = null;
    
    while(null !== (chunk = request.read())) {
      console.log(chunk.length);
      uploadedBytes += chunk.length;
      var progress = (uploadedBytes / fileBytes) * 100;
      response.write("progress: " + parseInt(progress, 10) + "%\n");

    }
  });

  request.pipe(newFile);

  request.on('end', function(){
    response.end('Uploaded!');
  });

}).listen(8080);