var register = function () {}
var logger = require('log-js')('LSTEN')
logger.changeLength(7)

register.prototype.init = function () {}

register.prototype.add = function (msg, mongo, client, db) {
  logger.log('Registering ' + msg[2])
  var users = db.collection('users')
  mongo.findUser(users, msg[2], function (success) {
    // logger.log(JSON.stringify(success))
    if (success == false) {
      mongo.createUser(users, msg, function (success) {
        logger.success('Created a User')
        client.emit('register success', 'Woo!')
      })
    } else {
      client.emit('email exists', ':(')
      logger.warning('User Already Exists')
    }
  })
}

module.exports = new register()
