var socket = function () {}
var logger = require('./logger.js')
var l = 'SOCKT'

var clients = []

socket.prototype.init = function (io, register, mongo, db, login, config, storage) {
  io.on('connection', function (socket) {
    logger.log(l, 'New client connected (id=' + socket.id + ').')
    clients.push(socket)
    // console.log('A User Connected')
    socket.on('disconnect', function () {
      // console.log('A User Disconnected')
      var index = clients.indexOf(socket)
      if (index != -1) {
        clients.splice(index, 1)
        logger.log(l, 'Client gone (id=' + socket.id + ').')
      }
    })
    socket.on('register', function (msg) {
      var index = clients.indexOf(socket)
      if (index != -1) {
        register.add(msg, mongo, clients[index], db)
      }
    })
    socket.on('login', function (msg) {
      // logger.log(l, JSON.stringify(msg))
      var index = clients.indexOf(socket)
      if (index != -1) {
        login.login(msg, mongo, clients[index], db, config, login, storage)
      }
    })
    socket.on('test key', function (msg) {
      logger.log(l, 'Testing Key: ' + msg)
      console.log(storage.test(msg))
    })
  })
}

module.exports = new socket()
