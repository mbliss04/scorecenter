//include ("/javascripts/jquery.js");

var express = require('express');
var app = express.createServer(express.logger());
app.use(express.bodyParser());

app.configure(function(){
        app.set('views', __dirname + '/views');
        app.use(express.static(__dirname + '/public'));
})

// ENABLE CORS
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res) {
  res.render('/index.html');
});

var mongodb = require("mongodb"),
    mongoserver = new mongodb.Server('localhost', 2701, {safe:false,}),
    db_connector = new mongodb.Db('highscores', mongoserver, {w:0}); 

db_connector.open(function() {

  db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
    if( err || !saved ) console.log("User not saved");
    else console.log("User saved");
  });

  db.users.find({email: "srirangan@gmail.com"}, function(err, users) {
    if( err || !users) console.log("No female users found");
    else users.forEach( function(femaleUser) {
      console.log(femaleUser);
    } );
  });

});

app.get("/submit.json", function(req, res) {
  res.setHeader('Content-Type', 'text/json');
  res.send('{"error: Something went wrong"}');
});

app.post("/submit.json", function(req, res) {
  res.send("done");
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});