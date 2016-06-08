var routing = function () {}

routing.prototype.init = function (app, express, session) {
  root = __dirname.split('\\')
  root.pop()
  root = root.join('\\')

  app.use('/', express.static(root + '/static'))

  app.get('/', function (req, res) {
    res.render('index', { "loggedIn": true, "email": "test@email.com"});
  })

  app.get('/login', function (req, res) {
    res.sendFile(root + '/static/login.html')
  })

  app.get('/logout', function (req, res) {
    res.sendFile(root + '/static/logout.html')
  })

  app.get('/logged_in', function (req, res) {
    res.sendFile(root + '/static/logged_in.html')
  })
}

module.exports = new routing()
