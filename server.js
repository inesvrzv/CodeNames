const express = require('express');
const app = express();
//console.log(app);
port = process.env.PORT || 3000;
const server = app.listen(port, showListen);
function showListen(){
	const port = server.address().port;
	console.log('port' + port);
}
app.use(express.static('public'));

//WEBSOCKET

const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
	console.log('Websocket connection ID: ' + socket.id);

	socket.on('trigger-click-cell', (data) => {
		console.log(data);
		io.sockets.emit('click-cell', data);
	})
	socket.on('rerun', () => {
		console.log('rerun');
		io.sockets.emit('reload');
	})
});

