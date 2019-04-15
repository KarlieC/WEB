
var mongoose = require('mongoose');

// local
// var db = mongoose.connect('mongodb://localhost:27017/webdev');

// heroku
 var db = mongoose.connect('mongodb://KarlieC:Cky@2018@ds137596.mlab.com:37596/heroku_zvkvr8m3')

module.exports = db;
