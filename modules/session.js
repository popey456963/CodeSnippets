var session = function () {}
var logger = require('log-js')('SESSN')
logger.changeLength(7)

/* Session Database Contains
 - email: Users Email Address
 - guid:  Unique Identifier
 - date:  Initial Date of User Login
*/

checker = function() {
	currentTime = +new Date()
	tempStore = []
	for(i=0; i < currentStored.length; i++) {
		createdTime = currentStored[i]["time"]
		if (createdTime + 1000 * 60 * 60 * (24) < currentTime) {
			tempStore.push(currentStored[i])
		} else {
			temp = currentStored[i]
			console.log(temp)
			logger.log("We removed a GUID from storage: " + String(temp["guid"]).substring(0,16))
		}
	}
	currentStored = tempStore
	logger.success("Cleanup of GUIDs Ran Successfully!")
}

currentStored = []

session.prototype.init = function () {
	(function loop() { checker(); setTimeout( loop, 1000 * 60 * 30 ) })();
}

session.prototype.add = function (msg, guid, callback) {
	currentStored.push({
		msg: msg,
		guid: guid,
		time: +new Date()
	})
	logger.log(JSON.stringify(currentStored))
	callback(true)
}

session.prototype.test = function (guid, callback) {
	for (i=0; i<currentStored.length; i++) {
		if (guid == currentStored[i].guid) {
			callback(currentStored[i].msg)
		}
	}
	callback(false)
}

session.prototype.remove = function (guid, callback) {
	for (i=0; i<currentStored.length; i++) {
		if (guid == currentStored[i].guid) {
			array.splice(index, 1);
		}
	}
}

module.exports = new session()