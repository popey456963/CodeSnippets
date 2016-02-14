/*
Code Snippet Storage by Popey Gilbert
Formatted with the Standard Library
*/

var mongodb = require('mongodb')
var express = require('express')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var MongoClient = mongodb.MongoClient

var config = require('./config.js')
var routing = require('./modules/routing.js')
var socket = require('./modules/socket.js')
var listen = require('./modules/listen.js')
var register = require('./modules/register.js')
var mongo = require('./modules/mongo.js')

mongo.connect(MongoClient, config, function (db) {
  var users = db.collection('users')
  mongo.ensureUnique(users)

  register.init()
  routing.init(app, express)
  socket.init(io, register, mongo)
  listen.init(http, config.port)
})

/*
mongo.connect(MongoClient, config, callback) {} -- Connects to MongoDB
mongo.ensureUnique(collection) {} -- Ensures Unique Usernames
mongo.createUser(collection, name, username, gist, callback) {} -- Creates a User
mongo.findUser(collection, name) {} -- Finds a User
*/
