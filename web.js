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
  /*
  db.collection('scores', function (err, collection) {
    console.log(err);
    collection.insert({'hello':'hi'});
  });
  */
  response.set('Content-Type', 'text/html');
  //response.send('<p>Hi!</p>');
  response.sendfile('public/index.html');
});


app.get('/highscores.json', function(request, response) {
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
