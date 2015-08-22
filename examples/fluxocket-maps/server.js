var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.use(express.static('public'));

app.get('*', function(req, res){
	res.send(fs.readFileSync('index.html', { encoding: 'utf8' }));
});

io.on('connection', function(socket){
	socket.on('flux_action', function(payload) {
		socket.broadcast.emit('flux_action', payload);
	});
	socket.on('disconnect', function(){
		socket.broadcast.emit('flux_action', {
			action: 'remove_user',
			data: {
				id: socket.id
			}
		});
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
