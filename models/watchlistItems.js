var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WatchlistSchema = new Schema({
	movie: Array,
	watched: Boolean,
});

var Watchlist = mongoose.model('Watchlist', WatchlistSchema);
module.exports = Watchlist;