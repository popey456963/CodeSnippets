/*
Code Snippet Storage by Popey Gilbert
Formatted with the Standard Library
*/

var mongodb = require('mongodb')
var express = require('express')
var program = require('commander')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var MongoClient = mongodb.MongoClient
var spawn = require('child_process').spawn
var logger = require('log-js')("INDEX")

app.set('view engine', 'pug')
logger.changeLength(7)
logger.log('Loaded External Modules')

var config = require('./config.js')
var routing = require('./modules/routing.js')
var socket = require('./modules/socket.js')
var listen = require('./modules/listen.js')
var register = require('./modules/register.js')
var mongo = require('./modules/mongo.js')
var options = require('./modules/commander.js')
var login = require('./modules/login.js')
var session = require('./modules/session.js')
var storage = require('./modules/storage.js')

logger.log('Loaded Internal Modules')

mongo.connect(MongoClient, config, function (db) {
  var users = db.collection('users')
  var logbook = db.collection('logbook')
  mongo.ensureUniqueUsers(users)
  mongo.ensureUniqueGUID(logbook)

  options.init(program, config, users, spawn)
  storage.init()
  session.init()
  register.init()
  login.init()
  routing.init(app, express, session)
  socket.init(io, register, mongo, db, login, config, session)
  listen.init(http, config.port)
  logger.log('Initiated Internal Modules')
})
