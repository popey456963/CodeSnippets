//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/codesnippets';

// Use connect method to connect to the Server
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