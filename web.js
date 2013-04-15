// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());

// Enable CORS
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://mccall:a1daf5ae5868ab7c9e6fee4050e20fc5@dharma.mongohq.com:10021/scores';

var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  console.log(error);
  db = databaseConnection;
});

app.get('/', function (request, response) {
  //db.collection('scores', function (err, collection) {
    //console.log(err);
    //collection.insert({'hello':'hi'});
  //});
  response.set('Content-Type', 'text/html');
  response.send('<p>Hi!</p>');
});

app.get('/data.json', function(request, response) {
  response.set('Content-Type', 'text/json');
  response.send('{"status":"good"}');
});

app.get('/fool', function(request, response) {
  response.set('Content-Type', 'text/html');
  response.send(500, 'Something broke!');
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

/*
app.get("/", function (request, response) {
  db.collection('scores', function (er, collection) {
    var doc1 = {'user': 'mccall'};
    collection.insert(doc1);
    collection.find('mccall', function (err, collection) {
      if (err || !collection) {
        console.log("not found");
      }
      else
        console.log("all good");
    });
  });
  response.set('Content-Type', 'text/html');
  response.send('<p>Hi!</p>');
  //response.render('/index.html');
});

app.get("/submit.json", function (req, res) {
  res.setHeader('Content-Type', 'text/json');
  res.send('{"error: Something went wrong"}');
});

app.post("/submit.json", function (req, res) {
  res.send("done");
});

app.get('/error', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send(500, 'Something went wrong!');
});

var mongo = require('mongodb'), Server = mongo.Server, Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('highscores', server, {w:0});

db.open(function (err, db) {
  if(!err) {
    db.collection('scores', function (err, collection) {
      var doc1 = {'hello':'doc1'};
      var doc2 = {'hello':'doc2'};
      var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];
      collection.insert(doc1);
      collection.insert(doc2, {safe:true}, function (err, result) {});
      collection.insert(lotsOfDocs, {safe:true}, function (err, result) {});
      collection.find({'hello'});
    });
  }
});

var db = require("mongodb"),
    mongoserver = new db.Server('localhost', 2701, {safe:false,}),
    db_connector = new db.Db('highscores', mongoserver, {w:0}); 

db_connector.open(function () {
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
