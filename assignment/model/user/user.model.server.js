var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model('userModel', userSchema);

// implement these functions at line 17
userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

// make model usable by others
module.exports = userModel;

// function go here
// server service will call these function
function createUser(user) {
  console.log("created in user model " + user);
  return userModel.create(user);
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
  return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
  return userModel.findOne({username: username, password: password});
}

function updateUser(userId, user) {
  return userModel.findByIdAndUpdate(userId, user).then(
    function() {
      return findUserById(userId);
    }
  )
  // return userModel.findOneAndUpdate({_id: userId}, user);
}

function deleteUser(userId) {
  return userModel.findOneAndDelete(userId);
}

