var mongoose = require("mongoose");
    mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL || 
                      "mongodb://localhost/b-side" );


module.exports.Watchlist = require('./watchlistItems.js');
module.exports.User = require('./users.js');
module.exports.Review= require('./reviews.js');
module.exports.Movie = require('./movies.js');