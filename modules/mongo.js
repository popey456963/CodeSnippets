var mongo = function () {}

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

mongo.prototype.createUser = function (collection, name, username, gist, callback) {
  var user = {
    name: name,
    username: username,
    gist: gist
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
