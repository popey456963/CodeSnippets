var socket = function () {}
var logger = require('log-js')('LSTEN')
logger.changeLength(7)

var clients = []

socket.prototype.init = function (io, register, mongo, db, login, config, storage) {
  io.on('connection', function (socket) {
    logger.log('New client connected (id=' + socket.id + ').')
    clients.push(socket)
    // console.log('A User Connected')
    socket.on('disconnect', function () {
      // console.log('A User Disconnected')
      var index = clients.indexOf(socket)
      if (index != -1) {
        clients.splice(index, 1)
        logger.log('Client gone (id=' + socket.id + ').')
      }
    })
    socket.on('register', function (msg) {
      var index = clients.indexOf(socket)
      if (index != -1) {
        register.add(msg, mongo, clients[index], db)
      }
    })
    socket.on('login', function (msg) {
      // logger.log(JSON.stringify(msg))
      var index = clients.indexOf(socket)
      if (index != -1) {
        login.login(msg, mongo, clients[index], db, config, login, storage)
      }
    })
    socket.on('test key', function (msg) {
      logger.log('Testing Key: ' + msg)
      logger.log(storage.test(msg))
    })
    socket.on('test guid', function(msg, callback) {
      storage.test(msg, function(result) {
        if (result) {
          callback(result)
        } else {
          callback(false)
        }
      })
    })
    socket.on('add code', function(msg, callback) {
      // [Email, UUID, Code]
      logger.log("Added Code: " + JSON.stringify(msg))
      callback([1, "CODEID"])
    })
    socket.on('edit code', function(msg, callback) {
      // [Email, UUID, CodeID, UUID]
      logger.log("Editted Code: " + JSON.stringify(msg))
      callback([1])
    })
    socket.on('remove code', function(msg, callback) {
      // [Email, UUID, CodeID]
      logger.log("Editted Code: " + JSON.stringify(msg))
      callback([1])
    })
    socket.on('list codes', function(msg, callback) {
      // [Email, UUID]
      logger.log("Editted Code: " + JSON.stringify(msg))
      callback[1, ["LIST", "OF", "CODES"]]
    })
  })

}
module.exports = new socket()
