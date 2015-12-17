// require express and other modules
var express = require('express'),
	Review = require('./models/reviews.js'),
    User = require('./models/users.js'),
    app = express();
	db = require("./models"),
	bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
// serve static files from public folder
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//user auth
  app.get('/signup', function reviews(req, res){
  	res.sendFile(__dirname + '/view/signup.html');
  });

app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/');
      });
    }
  );
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/users/:id', function findUser(req, res){
  var userId = req.params.id;
	db.User.findById(userId, function (err, found){
		res.json(found);
	});
});

app.get('/users/:id/reviews', function findUser(req, res){
  var userId = req.params.id;
  db.User.findById({_id: userId}, function (err, found){
    res.json(found);
  });
});

  app.get('/users', function userPage (req, res) {
    db.User.find({}, function (err, found){
    	res.json(found);
    });
  });

  app.get('/profile', function (req, res) {
    res.json({user: req.user});
  });
  // app.post('/users/:id/reviews', function userReviews(){
  //   var id = req.params.id;
  //   var dataAdded = req.body;
  //   console.log('userpostid' , id);
  //   console.log('userpost req.body', req.body);
  //   db.User.create({_id: id}, dataAdded, function(err, success){
  //     console.log(success);
  //   });
  // });

  app.delete('/users/:id', function deleteUser(req, res){

    var userId = req.params.id;
    console.log('userId', userId);
    db.User.findByIdAndRemove({_id: userId}, function (err, sucess){
    });
  });


//html endpoints
  app.get('/', function homepage (req, res) {
    res.sendFile(__dirname + '/view/index.html');
  });

  app.get('/signup', function reviews(req, res){
  	res.sendFile(__dirname + '/view/signup.html');
  });

  app.get('/userName', function userPage(req, res){
    res.sendFile(__dirname + '/view/user.html');
  });

// log in user
  app.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/userName');
  });

  // show user profile page
  app.get('/users', function (req, res) {
    // only show profile if user is logged in
    if (req.user) {
      res.render('profile', { user: req.user });
    } else {
      res.redirect('/login');
    }
  });

//api endpoints
  // app.get('/api/users', function profilePage(req, res){
  //   db.User.find({}, function (err, User){
  //     console.log(User);
  //     res.send(User);
  //   });
  // });
  app.post('/users/:id/reviews', function userPostedReview(req,res){
    console.log('req.body', req.body);
    var id = req.params.id;
    var userPost = req.body;
    var user= userPost.user;
    var movie = userPost.movie;
    var text = userPost.text;
    var postData=  {movie: movie, text: text};
    console.log('postData', postData);
    db.User.findById(id, function (err, success){
      
      //db.User.reviews.update(postData);
      success.reviews.push(postData);
      success.save(function(err){
        if (err) {console.log(err);}
      });
      console.log('success', success);
      res.send(success);
    });
  });

  app.delete('/users/:userid/reviews/:id', function deleteUserReview (req, res){
    var userId= req.params.userid;
    var reviewId = req.params.id;
    db.User.findById(userId , function (err, foundUser){
      var foundReview = foundUser.reviews.id(reviewId);
      console.log('found review', foundReview);
      foundReview.remove();
      foundUser.save(function (err, saved){
        console.log('saved', saved);
        res.send(saved);
      });

    });
  });

//reviews endpoints
  app.get('/api/reviews', function getReviews(req, res){
  	db.Review.find({}, function (err, review){
  		res.json(review);
  	});
  });

  app.get('/api/reviews/:id', function getReviewsById(req, res){
  	db.Review.find({_id: req.params.id}, function (err, review){
  		console.log(review);
  		res.send(review);
  	});
  });


app.put('/api/reviews/:review_id', function editreview(req, res){
  var newData = req.body;
  db.Review.findByIdAndUpdate(req.params.review_id, newData, function(err, success){
    if(err) {console.log(err);}
    success.save(function (err){
    });
    res.json(success);
  });
});
 
  app.post('/api/reviews', function postreview(req, res){ 
  	var newReview= req.body;
  	db.Review.create(newReview, function (err, success){
  		if(err) {console.log(err);}
  		success.save(function (err){
  			if (err) {console.log(err);}
  	// db.User.create(newReview, function postToUser(err, userpost){
   //  console.log('post to user', userpost);
  	   // });		
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






// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});