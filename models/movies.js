var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
	Title: String,
	rating: String,
	Released: String,
	Plot: String,
	imdbRating: Number,
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;