var listen = function () {}
var logger = require('log-js')('LSTEN')
logger.changeLength(7)

listen.prototype.init = function (http, port) {
  http.listen(port, function () {
    logger.success('Listening on *:' + String(port))
  })
}

module.exports = new listen()
