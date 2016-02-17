var register = function () {}
var logger = require('./logger.js')
var l = 'RGSTR'

register.prototype.init = function () {}

register.prototype.add = function (msg, mongo, client, db) {
  logger.log(l, 'Registering ' + msg[2])
  var users = db.collection('users')
  mongo.findUser(users, msg[2], function (success) {
    // logger.log(l, JSON.stringify(success))
    if (success == false) {
      mongo.createUser(users, msg, function (success) {
        logger.success(l, 'Created a User')
        client.emit('register success', 'Woo!')
      })
    } else {
      client.emit('email exists', ':(')
      logger.warning(l, 'User Already Exists')
    }
  })
}

module.exports = new register()
