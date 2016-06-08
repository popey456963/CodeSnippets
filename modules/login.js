var login = function () {}
var logger = require('log-js')('LSTEN')
logger.changeLength(7)

login.prototype.init = function () {}

login.prototype.login = function (msg, mongo, client, db, config, login, storage) {
  logger.log('Logging in ' + msg[0])
  var users = db.collection('users')
  mongo.checkUser(users, msg[0], msg[1], function (result) {
    // client.emit('test', 'message')
    if (result == false) {
      client.emit('login failure', ':(')
    } else {
      // logger.log(JSON.stringify(result))
      login.securityCode(config, login, function (guid) {
        storage.add(msg[0], guid, function () {
          client.emit('login success', guid)
        })
      })
    }
  })
}

login.prototype.securityCode = function (config, login, callback) {
  callback(login.randomString(64, config.keyStrategy))
}

login.prototype.randomString = function (length, chars) {
  var mask = ''
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.indexOf('#') > -1) mask += '0123456789'
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  var result = ''
  for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)]
  return result
}

module.exports = new login()
