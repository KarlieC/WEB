var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model('Website', websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
  console.log("model create website " + website);
  return websiteModel.create(website).then(
    function(newWebsite){
      userModel.findUserById(userId).then(
        function(user){
          user.websites.push(newWebsite);
          return userModel.updateUser(userId,user);
        }
      );
      return newWebsite;
    }
  );
}

function findAllWebsitesForUser(userId) {
  return websiteModel.find({developerId: userId});
}

function findWebsiteById(websiteId) {
  return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return websiteModel.findOneAndUpdate({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return websiteModel.findOneAndDelete({_id: websiteId});
}
