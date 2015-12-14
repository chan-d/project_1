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


var reviews = [];


  app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.get('/movie', function reviews(req, res){
  	res.sendFile(__dirname + '/view/movie.html');
  });

  app.get('/api/reviews', function getReviews(req, res){
  	db.Review.find({}, function (err, review){
  		res.json(review);
  	});
  });

  app.post('/api/reviews', function postreview(req, res){ 
  	console.log(req.body);
  	var newReview= req.body;
  	db.Review.create(newReview, function (err, success){
  		if(err) {console.log(err);}
  		//success.movie.push(newReview);
  		success.save(function (err){
  			if (err) {console.log(err);}
  	db.Review.find({}, function findReviews(err, found){
  		console.log(found);
  	});
  			res.send(success);
  		});
  		
  	});
  });


app.delete('/api/reviews/:review_id', function deleteUserReview(req, res){
	db.Review.findByIdAndRemove(req.params.review_id, function (err, success){
		console.log('did it');
    	if(err) {console.log(err);}
    	res.send({status: 200});
	});
});

  // app.get('/api/movies', function getMovies (req, res){

  // });




// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});