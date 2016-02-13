var mongodb = require('mongodb');
var app = require('express')();
var http = require('http').Server(app);

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/codesnippets';
var port = 3000

app.get("/", function(req, res) {
	res.send("<h1>Hello World</h1>");
})

http.listen(port, function() {
	console.log("Listenning on *:" + String(port));
});

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    var collection = db.collection("users");
    collection.createIndex( { username: 1}, {unique: true} );

    if (1 == 1) {
    	var user = {name: "Popey Gilbert", username: "Popey456963", gist:"popey456963"};
    	collection.insert([user], function(err, result) {
    		if (err) {
    			// console.log(err);
    		} else {
    			console.log("Inserted Documents.");
    		}
    	});
    }

    if (1 == 1) {
	    collection.find({name: 'Popey Gilbert'}).toArray(function (err, result) {
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