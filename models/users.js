var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    passportLocalMongoose = require('passport-local-mongoose');
    
var Review= require('./reviews.js');
// var WatchlistSchema = require('./watchlistItems.js');

var UserSchema = new Schema({
  	password: String,
	userName: String,
	// watchlistItem: [WatchlistSchema],
	reviews: [Review.schema]
//	review: [{movie: String, 
//			 text: String}]

});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;