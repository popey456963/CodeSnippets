var routing = function() {};

routing.prototype.init = function(app, express) {
	app.use('/', express.static(__dirname + '/static'));

	app.get("/", function(req, res) {
	    res.sendFile(__dirname + '/static/index.html');
	})

	app.get("/login", function(req, res) {
	    res.sendFile(__dirname + '/static/login.html');
	})
}

module.exports = new routing();