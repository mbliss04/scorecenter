include ("/javascripts/jquery.js");

var express = require('express');
var app = express.createServer(express.logger());

var mongo = require('mongodb');
var db = new mongo.Db('highscores', new mongo.Server('localhost',22892, {}), {});

db.open(function(){});

db.collection('docs', function(err,collection){
    doc = {"foo":"bar"};
    collection.insert(doc, function(){});
});

// ENABLE CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.get('/', function(request, response) {
  response.send(function(){
  	// display list of all high scores
  	//$.post( url [, data ] [, success(data, textStatus, jqXHR) ] [, dataType ] )
  	// display one text box with searchable username
  });
});

/* FUNCTIONS I NEED

Search and find a user

db.users.find({sex: "female"}, function(err, users) {
  if( err || !users) console.log("No female users found");
  else users.forEach( function(femaleUser) {
    console.log(femaleUser);
  } );
});

Save a username and score

db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});