var storage = function () {}
var logger = require('./logger.js')
var l = 'STRGE'

/* Storage Database Contains
 - email: Users Email Address
 - guid:  Unique Identifier
 - date:  Initial Date of User Login
*/

storage.prototype.init = function () {}

storage.prototype.add = function (guid, callback) {}

storage.prototype.test = function (guid, callback) {}

module.exports = new storage()
