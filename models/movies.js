var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema =require('./reviews.js');

var MovieSchema = new Schema({
	Title: String,
	rating: String,
	Released: String,
	Plot: String,
	imdbRating: Number,
	reviews: [ReviewSchema]
});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;