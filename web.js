var express = require('express');

var app = express.createServer(express.logger());

var databaseUrl = "mydb"; // "username:password@example.com/mydb"

var collections = ["users", "reports"]

var db = require("mongojs").connect(databaseUrl, collections);

// ENABLE CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(request, response) {
  response.send(function(){
  	// display list of all high scores

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

*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});