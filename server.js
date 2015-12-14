// require express and other modules
var express = require('express'),
    app = express();
var db = require("./models");
var bodyParser = require('body-parser');
// serve static files from public folder
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.get('/movie', function reviews(req, res){
  	res.sendFile(__dirname + '/view/movie.html');
  });

app.delete('/api/users', function deleteUserReview(req, res){
	console.log("delete user review");
});

  // app.get('/api/movies', function getMovies (req, res){

  // });




// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});