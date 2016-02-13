var mongodb = require('mongodb');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = mongodb.MongoClient;

var config = require('./config.js');
var routing = require('./modules/routing.js');
var socket = require('./modules/socket.js');
var listen = require('./modules/listen.js');

routing.init(app, express);
socket.init(io)
listen.init(http, config.port);



MongoClient.connect(config.url, function(err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', config.url);

        var collection = db.collection("users");
        collection.createIndex({
            username: 1
        }, {
            unique: true
        });

        if (1 == 1) {
            var user = {
                name: "Popey Gilbert",
                username: "Popey456963",
                gist: "popey456963"
            };
            collection.insert([user], function(err, result) {
                if (err) {
                    // console.log(err);
                } else {
                    console.log("Inserted Documents.");
                }
            });
        }

        if (1 == 1) {
            collection.find({
                name: 'Popey Gilbert'
            }).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
            });
        }
    }
});