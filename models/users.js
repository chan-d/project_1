var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var ReviewSchema= require('./reviews.js');
var WatchlistSchema = require('./watchlistItems.js');

var UserSchema = new Schema({
	userName: String,
	watchlistItem: [WatchlistSchema],
	completedReviews: [ReviewSchema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;