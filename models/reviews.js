var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	user: Array,
	movie: String,
	text: String
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;