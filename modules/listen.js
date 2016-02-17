var listen = function () {}
var logger = require('./logger.js')
var l = 'LSTEN'

listen.prototype.init = function (http, port) {
  http.listen(port, function () {
    logger.success(l, 'Listening on *:' + String(port))
  })
}

module.exports = new listen()
