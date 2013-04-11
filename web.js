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

app.get("/submit.json", function(req, res) {
  res.setHeader('Content-Type', 'text/json');
  res.send('{"error: Something went wrong"}');
});

app.post("/submit.json", function(req, res) {
  res.send("done");
});

app.get('/', function(req, res) {
  res.render('/index.html');
});

var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('highscores', server, {w:0});

db.open(function(err, db) {
  if(!err) {
    db.collection('scores', function(err, collection) {
      var doc1 = {'hello':'doc1'};
      var doc2 = {'hello':'doc2'};
      var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
      collection.insert(doc1);
      collection.insert(doc2, {safe:true}, function(err, result) {});
      collection.insert(lotsOfDocs, {safe:true}, function(err, result) {});
    });
  }
});

/*
var db = require("mongodb"),
    mongoserver = new db.Server('localhost', 2701, {safe:false,}),
    db_connector = new db.Db('highscores', mongoserver, {w:0}); 

db_connector.open(function() {
  db_connector.collection('highscores', function(err, coll) {
    db.highscores.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
      if( err || !saved ) console.log("User not saved");
      else console.log("User saved");
    });

    db.highscores.find({email: "srirangan@gmail.com"}, function(err, users) {
      if( err || !users) console.log("No female users found");
      else users.forEach( function(femaleUser) {
        console.log(femaleUser);
      });
    });
  });
});
*/

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
