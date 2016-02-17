/*
Code Snippet Storage by Popey Gilbert
Formatted with the Standard Library
*/

var logger = new require('./modules/logger.js')
var l = 'APP'

var mongodb = require('mongodb')
var express = require('express')
var program = require('commander')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var MongoClient = mongodb.MongoClient
var spawn = require('child_process').spawn

logger.log(l, 'Loaded External Modules')

var config = require('./config.js')
var routing = require('./modules/routing.js')
var socket = require('./modules/socket.js')
var listen = require('./modules/listen.js')
var register = require('./modules/register.js')
var mongo = require('./modules/mongo.js')
var options = require('./modules/commander.js')
var login = require('./modules/login.js')

logger.log(l, 'Loaded Internal Modules')

mongo.connect(MongoClient, config, function (db) {
  var users = db.collection('users')
  mongo.ensureUnique(users)

  options.init(program, config, users, spawn)
  register.init()
  login.init()
  routing.init(app, express)
  socket.init(io, register, mongo, db, login)
  listen.init(http, config.port)
  logger.log(l, 'Initiated Internal Modules')
})
