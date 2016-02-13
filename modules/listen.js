var listen = function () {}

listen.prototype.init = function (http, port) {
  http.listen(port, function () {
    console.log('Listening on *:' + String(port))
  })
}

module.exports = new listen()
