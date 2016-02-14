var socket = function () {}

var clients = []

socket.prototype.init = function (io, register, mongo) {
  io.on('connection', function (socket) {
    console.log('New client connected (id=' + socket.id + ').')
    clients.push(socket)
    // console.log('A User Connected')
    socket.on('disconnect', function () {
      // console.log('A User Disconnected')
      var index = clients.indexOf(socket)
      if (index != -1) {
        clients.splice(index, 1)
        console.log('Client gone (id=' + socket.id + ').')
      }
    })
    socket.on('register', function (msg) {
      var index = clients.indexOf(socket)
      if (index != -1) {
        register.add(msg, mongo, clients[index])
      }
    })
    socket.on('login', function (msg) {
      console.log(msg)
    })
  })
}

module.exports = new socket()
