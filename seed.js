var db = require("./models");

var sampleReview = [{
	user: "adminUser",
	movie:"Pan", 
	review:"this movie stinks"
}];



db.Review.remove({}, function(err){
  if (err) { return console.log(err); }
  console.log("Deleted all of the things");
});

  db.Review.create(sampleReview, function(err, reviews){
    if (err) { return console.log('ERROR', err); }
    console.log("all reviews:", reviews);
    console.log("created", reviews.length, "reviews");
    process.exit();
  });
