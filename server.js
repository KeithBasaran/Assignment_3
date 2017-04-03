// server.js - code for web server, server-side code.
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// Variable used to access the Socket.io package.
var io = require('socket.io')(server);

// Server static files.
app.use(express.static(__dirname + '/public'));

// Redirects the directory path to the "index.html" file.
app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/public/index.html');
});

// This function is executed when a client connects
io.on('connection', function(socket) {
    console.log('User: ' + socket.id + ' has connected');
	
    socket.on('disconnect', function(id) {
        console.log('User: ' + socket.id + ' has disconnected');
    });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg, userId){
    io.emit('chat message', msg, userId);
  });
});

// Gets the web server and socket.io server to listen on port 3000.
server.listen(3000, function(){
  console.log('listening on *: 3000');
});