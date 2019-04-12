var mongoose = require('mongoose');

var pageSchema = require('../page/page.schema.server');

var websiteSchema = mongoose.Schema({
  developerId: {type: mongoose.Schema.ObjectId, ref: "userModel"},
  websiteName: String,
  description: String,
  pages: [pageSchema],
  dataCreated: {type: Date, default: Date.now()}
}, {collection: "Websites"});

module.exports = websiteSchema;

