var mongo = function () {}
var bcrypt = require('bcrypt')

/*
mongo.connect(MongoClient, config, callback) {} -- Connects to MongoDB
mongo.ensureUnique(collection) {} -- Ensures Unique Usernames
mongo.createUser(collection, name, username, gist, callback) {} -- Creates a User
mongo.findUser(collection, name) {} -- Finds a User
*/

mongo.prototype.connect = function (MongoClient, config, callback) {
  MongoClient.connect(config.url, function (err, db) {
    if (err) { console.log('Unable to connect to the mongoDB server. Error:', err); } else {
      console.log('Connection established to', config.url)
      callback(db)
    }
  })
}

mongo.prototype.ensureUnique = function (collection) {
  collection.createIndex({
    username: 1
  }, {
    unique: true
  })
}

mongo.prototype.hash = function (msg, callback) {
  return bcrypt.hashSync(msg, 12)
}

mongo.prototype.createUser = function (collection, msg, callback) {
  this.hash(msg[5], function (hash) {
    var user = {
      name: msg[0] + ' ' + msg[1],
      email: msg[2],
      gist: msg[3],
      username: msg[4],
      password: hash
    }

    collection.insert([user], function (err, result) {
      if (err) {
        console.log('An Error Occurred Creating the User')
        callback(false)
      } else {
        console.log('Inserted Documents')
        callback(true)
      }
    })
  })
}

mongo.prototype.findUser = function (collection, name, callback) {
  collection.find({
    name: name
  }).toArray(function (err, result) {
    if (err) {
      console.log('An Error Occurred Finding the User')
      callback(false)
    } else if (result.length) {
      console.log('Found Result')
      callback(result)
    } else {
      console.log('No Results Found')
      callback(false)
    }
  })
}

module.exports = new mongo()
