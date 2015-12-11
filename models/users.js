var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: String,
	watchlist: Array,
	reviews: Array
});

var User = mongoose.model('User', UserSchema);
module.exports = User;