var code_storage = function () {}
var logger = require('log-js')("CSTRG")
logger.changeLength(7)

/* Session Database Contains
 - email: Users Email Address
 - guid:  Unique Identifier
 - date:  Initial Date of User Login
*/

session.prototype.init = function () {
	(function loop() { checker(); setTimeout( loop, 1000 * 60 * 30 ) })();
}

module.exports = new session()