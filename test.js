var bcrypt = require("bcrypt")
bcrypt.hash("Hello, World!", 20, function (err, hash) {
	console.log(hash)
})
