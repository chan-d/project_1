var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	user: Array,
	// review: Array, //// [{movie:"Pan", review:"this movie stinks"}]
	movie: String,
	review: String
});

var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;