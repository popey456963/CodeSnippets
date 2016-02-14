var routing = function () {}

routing.prototype.init = function (app, express) {
  root = __dirname.split('\\')
  root.pop()
  root = root.join('\\')

  app.use('/', express.static(root + '/static'))

  app.get('/', function (req, res) {
    res.sendFile(root + '/static/index.html')
  })

  app.get('/login', function (req, res) {
    res.sendFile(root + '/static/login.html')
  })
}

module.exports = new routing()
