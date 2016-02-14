var register = function () {}

register.prototype.init = function (io) {}

register.prototype.add = function (msg, mongo, client) {
  console.log('Registering ' + msg[2])
  mongo.findUser(users, msg[2], function (success) {
    if (success == false) {
      mongo.createUser(users, msg, function (success) {
        console.log('Created a User')
      })
    }
  })
  client.emit('register success', 'Woo!')
}

module.exports = new register()
