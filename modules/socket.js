var socket = function () {}

socket.prototype.init = function (io, register) {
  io.on('connection', function (socket) {
    // console.log('A User Connected')
    socket.on('disconnect', function () {
      // console.log('A User Disconnected')
    })
    socket.on('register', function (msg) {
      register.add(msg)
    })
    socket.on('login', function (msg) {
      console.log(msg)
    })
  })
}

/*mongo.connect(MongoClient, config, function (db) {
  var users = db.collection('users')
  mongo.ensureUnique(users)
  mongo.findUser(users, 'Popey Gilbert', function (success) {
    if (success == false) {
      mongo.createUser(users, 'Popey Gilbert', 'Popey456963', 'popey456963', function (success) {
        console.log('Created a User')
      })
    }
  })
})*/

module.exports = new socket()
