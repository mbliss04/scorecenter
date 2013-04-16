// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'scorecenter');

// Enable CORS
app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost:27017/scorecenter';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  console.log(error);
  db = databaseConnection;
});

app.post('/submit.json', function (request, response) {
  if (request.username && request.score && request.game_title) {
    db.collection('scores', function (err, collection) {
      jsonstring = '{';
      var user = "{ 'username' : " + request.username + "}";
      var game = "{ 'game_title' : " + request.game_title + "}";
      var score = "{ 'score' : " + request.score + "}";
      var dateplayed = new Date;
      jsonstring = jsonstring + user + game + score + dateplayed + '}';
      console.log(jsonstring);
      collection.insert(jsonstring);
    });
  }
});

app.get('/', function (request, response) {
  db.collection('scores', function (err, collection) {
    collection.find().sort({game_title:1}, function (err, cursor) {
      console.log(err);
      var content = '';
      cursor.each(function (err, item) {
        console.log(err);
        if (item) {
          content = content + '<tr><td>' + item.game_title + '</td><td>' + item.username + '</td><td>' + item.score + '</td><td>' + item.created_at + '</td></tr>';
        } 
        else {
          db.close();
          response.set('Content-Type', 'text/html');
          response.send('<!DOCTYPE html><html><head><title>Scorecenter</title></head><body><h1>High Scores</h1><p><a href="/usersearch">Find scores for a specific user</a></p><p>Find the top 10 scores for a specific game</p><form name="topscores" action="highscores.json" method="get">Game: <input type="text" name="game_title"><input type="submit" value="Submit"></form><p><table border=1px width=400px><tr><td>Game</td><td>Username</td><td>Score</td><td>Date Played</td></tr>' + content + '</table></p></body></html>');
        }
      });
    });
  });
});


app.get('/highscores.json', function (request, response) {
  var game = request.query;
  var content = '';
  db.collection('scores', function (error, collection) {
    collection.find(game).sort({score:-1}).limit(10, function (err, cursor) {
      cursor.each(function (er, item) {
        if (item) {
          content = content + JSON.stringify(item);
        }
        else {
          db.close();
          response.set('Content-Type', 'text/json');
          response.send(content);
        }
      });
    });
  });
});

app.get('/usersearch', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send('<!DOCTYPE html><html><head><title>User Search</title></head><body><h1>Find a list of scores for a specific user</h1><form name="search" action="displayuser" method="post">Username: <input type="text" name="username"><input type="submit" value="Submit"></form><p><a href="/">Back to all highscores</a></p></body></html>');
});

app.post('/displayuser', function (req, res) {
  var user = req.body.username;
  var content = '';
  db.collection('scores', function (error, collection) {
    collection.find({username:user}).sort({score:1}, function (err, cursor) {
      cursor.each(function (err, item) {
        if (item) {
          content = content + '<tr><td>' + item.game_title + '</td><td>' + item.score + '</td><td>' + item.created_at + '</td></tr>';
        }
        else {
          db.close();
          res.set('Content-Type', 'text/html');
          res.send('<!DOCTYPE html><html><h1>Displaying a list of scores for ' + user + '</h1><table border=1px width=400px><tr><td>Game</td><td>Score</td><td>Date Played</td></tr>' + content + '</table><p><a href="/">Back to all highscores</a></p></html>');
        }
      });
    });
  });
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
