var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	user: Array,
	movie: String,
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;