/*
 * @desc Load required modules
*/
var express = require('express');
var app = module.exports = express.createServer();
var sys = require('sys');
var fs = require('fs');
var io = require('socket.io');
var http = require('http');

var socket = io.listen(app);

socket.on('connection', function(client) {
  client.on('message', function(message) {
    socket.broadcast(message);
  }); 
});

// Config
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
	app.use(express.errorHandler()); 
});


// Home Page
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Laugh Track'
  });
});

// Only listen if parent module
if (!module.parent) {
  app.listen(10721);
  console.log("Express server listening on port %d", app.address().port);
}
