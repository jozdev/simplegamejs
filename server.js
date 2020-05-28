var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.Server(app);
var io = require('socket.io').listen(server);

app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
})

server.listen(8080, function(){
    console.log('Servidor online a utilizar a porta: 8080');
})

io.on('connection', function(socket) {
    io.sockets.emit('message','Welcome to Prison Escape, Prisoner');
})

let prisoners = {};
io.on('connection',function(socket){
    socket.on('prisoner joined',function() {
        prisoners[socket.id] = {
            x: -30,
            y: 375
       };
        
    });

    socket.on('disconnect',function(){
        delete prisoners[socket.id];
    })

    let prisonerspeed = 5;

    socket.on('movement', function(data) {
        let prisoner = prisoners[socket.id] || {};
        console.log(prisoner);
        if(data.up) {
            prisoner.y -= prisonerspeed;
        }
        if(data.down) {
            prisoner.y += prisonerspeed;
        }
        if(data.left) {
            prisoner.x -= prisonerspeed;
        }
        if(data.right) {
            prisoner.x += prisonerspeed;
        }

    })
});

setInterval(function() {
    io.sockets.emit('state',prisoners);
}, 1000/60)

