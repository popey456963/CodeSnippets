var socket = function() {};

socket.prototype.init = function(io) {
    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
        socket.on('button press', function(msg) {
            io.emit('user', msg);
        });
        socket.on('password', function(msg) {
        	console.log(msg);
        })
    });
}

module.exports = new socket();