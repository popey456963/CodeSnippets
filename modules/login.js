var login = function () {}
var logger = require('./logger.js')
var l = 'LOGIN'

login.prototype.init = function () {}

login.prototype.login = function (msg, mongo, client, db) {
  logger.log(l, 'Logging in ' + msg[0])
  var users = db.collection('users')
  mongo.checkUser(users, msg[0], msg[1], function (result) {
    if (result == false) {
      client.emit('login failure', ':(')
    } else {
      logger.log(l, JSON.stringify(result))
    }
  })
}

module.exports = new login()
