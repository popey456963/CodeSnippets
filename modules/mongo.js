var mongo = function () {}
//var bcrypt = require('bcrypt')
var logger = require('log-js')('MONGO')
logger.changeLength(7)

/*
mongo.connect(MongoClient, config, callback) {} -- Connects to MongoDB
mongo.ensureUnique(collection) {} -- Ensures Unique Usernames
mongo.createUser(collection, name, username, gist, callback) {} -- Creates a User
mongo.findUser(collection, name) {} -- Finds a User
mongo.checkUser(collection, email, password, callback) {} -- Check Credentials of a User
*/

mongo.prototype.connect = function (MongoClient, config, callback) {
  MongoClient.connect(config.url, function (err, db) {
    if (err) {
      logger.error('Unable to connect to the mongoDB server. Error:', err)
    } else {
      logger.log('Connection established to', config.url)
      callback(db)
    }
  })
}

mongo.prototype.ensureUniqueUsers = function (collection) {
  collection.createIndex({
    username: 1
  }, {
    unique: true
  })
}

mongo.prototype.ensureUniqueGUID = function (collection) {
  collection.createIndex({
    createdAt: 1
  }, {
    unique: true
  })
}

mongo.prototype.createUser = function (collection, msg, callback) {
  // bcrypt.genSalt(10, function (err, salt) {
  //  if (err) logger.error(err)
  //  logger.log('Salt: ' + salt)
  //  bcrypt.hash(msg[4], 10, function (err, hash) {
  //    if (err) logger.error(err)
  //    logger.log('Hash: ' + hash)
      var hash = msg[4]
      var user = {
        name: msg[0] + ' ' + msg[1],
        email: msg[2],
        gist: msg[3],
        password: hash
        
      }

      collection.insert([user], function (err, result) {
        if (err) {
          logger.error('An Error Occurred Creating the User')
          callback(false)
        } else {
          logger.log('Inserted Documents')
          callback(true)
        }
      //})
    //})
  //})
  })
}

mongo.prototype.findUser = function (collection, email, callback) {
  collection.find({
    email: email
  }).toArray(function (err, result) {
    if (err) {
      logger.error('An Error Occurred Finding the User')
      callback(false)
    } else if (result.length) {
      // logger.log('Found Result')
      callback(result)
    } else {
      // logger.log('No Results Found')
      callback(false)
    }
  })
}

mongo.prototype.checkUser = function (collection, email, password, callback) {
  this.findUser(collection, email, function (result) {
    if (result != false) {
      logger.log(JSON.stringify(result))
      logger.log('Given User Password: ' + password)
      logger.log('Stored Password: ' + result[0].password)
      //bcrypt.compare(password, result[0].password, function (err, res) {
      //  if (err) logger.error(err)
      //  logger.log('Matched Passwords: ' + res)
      //  callback(res)
      //})
  		callback(true)
    } else {
      callback(false)
    }
  })
}

module.exports = new mongo()
