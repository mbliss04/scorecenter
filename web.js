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
'mongodb://<mccall>:<a1daf5ae5868ab7c9e6fee4050e20fc5>@dharma.mongohq.com:10021/scores' ||
'mongodb://localhost:27017/scorecenter';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
  db = databaseConnection;
});

app.post('/submit.json', function (request, response) {
  db.collection('scores', function (err, collection) {
    for (i = 0; i < request.body.length(); i++) {
      if (!err) {
        collection.insert(request.body[i]);
        console.log('inserting');
      }
    }
  })
});

app.get('/', function (request, response) {
  db.collection('scores', function (err, collection) {
    collection.insert({'mccall':'bliss'});
    collection.insert({'game_title':'frogger', 'username': 'mccall', 'score': '50'});
    console.log('inserted');
  });
  response.set('Content-Type', 'text/html');
  response.sendfile('public/index.html');
});


app.get('/highscores.json', function (request, response) {
  var game = request.body.game_title;
  var content = '';
  db.collection('scores', function (req, res) {
    collection.find(game);
    //content = JSON.stringify();
  });
  response.set('Content-Type', 'text/json');
  response.send(content);
});

app.get('/usersearch', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send('<!DOCTYPE html><html><head><title>User Search</title></head><body><h1>Find a list of scores for a specific user</h1><form name="search" action="displayuser" method="post">Username: <input type="text" name="username"><input type="submit" value="Submit"></form><p><a href="/">Back to all highscores</a></p></body></html>');
});

app.post('/displayuser', function (req, res) {
  var scores = new Array();
  var username = req.body.username;
  /*
  db.collection('scores', function (request, response) {
    collection.find({'username':username});
  });*/
  var content = '';
  for (i = 0; i < scores.length(); i++) {
    content = content + '<tr><td>' + scores[i].game_title + '</td><td>' + scores[i].score + '</td><td>' + scores[i].dateplayed + '</td></tr>';
  }
  res.send('<!DOCTYPE html><html><h1>Displaying a list of scores for ' + username + '</h1><table border=1px width=400px><tr><td>Game</td><td>Score</td><td>Date Played</td></tr>' + content + '</table><p><a href="/">Back to all highscores</a></p></html>');
});

app.get('/fool', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send(500, 'Something broke!');
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
