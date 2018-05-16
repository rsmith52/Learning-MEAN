console.log('test log');
// Get the http and filesystem modules
var http = require('http'),
  fs = require('fs');

// Create our server using http modules
http.createServer(function(req, res) {

  // Write to our server. Set configuration for the response
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin' : '*'
  });

  // Grab the index.html file using fs
  var readStream = fs.createReadStream(__dirname + '/index.html');

  // Send the index.html file to our user
  readStream.pipe(res);

}).listen(1337);

// Tell ourselves what's happening
console.log('Visit me at http://localhost:1337');
