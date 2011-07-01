var sys = require('sys');
var io = require('socket.io');
var http = require('http');


var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Laugh Track is running..');
});

server.listen(10721);


var socket = io.listen(server);

socket.on('connection', function(client) {
  client.on('message', function(message) {
    socket.broadcast(message);
  }); 
});







