module.exports = function (app) {
  var userModel = require('../model/user/user.model.server');
  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require('bcrypt-nodejs');
  var facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  };
  // var facebookConfig = {
  //   clientID: '2149423578473950',
  //   clientSecret: '2dcb77099eac487440ed0d206edb7449',
  //   callbackURL: '/auth/facebook/callback'
  // };

  // get
  app.get("/api/user/hello", helloUser)
  // app.get("/api/user", findUserByCredentials);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUserByUsername);
  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/profile',
    failureRedirect: '/#/login'
  }));
  // post
  app.post("/api/user", createUser);
  app.post('/api/loggedin', loggedin);
  app.post('/api/login',passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  // put
  app.put("/api/user/:userId", updateUser);
  // delete
  app.delete("/api/user/:userId", deleteUser);
  //delete when  push to heroku
  // app.get("/api/populate", populateUser);

  // users = [
  //   {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
  //   {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
  //   {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
  //   {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  // ];

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use('local', new LocalStrategy(localStrategy));
  passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel.findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        }, function (err) {
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel.findUserByUsername(username)
      .then(
        function (user) {
          if (user && bcrypt.compareSync(password, user['password'])) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) { return done(err); }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel.findUserByFacebookId(profile.id).then(function (user) {
      if (user) {
        return done(null, user);
      } else {
        var names = profile.displayName.split(" ");
        var newFacebookUser = {
          lastName: names[1],
          firstName: names[0],
          email: profile.emails ? profile.emails[0].value : "",
          facebook: {id: profile.id, token: token, displayName: profile.displayName}
        };
        return userModel.createUser(newFacebookUser);
      }
    }, function (err) {
      if (err) {
        return done(err);
      }
    });
  }

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function login(req, res){
    var user = req.user;
    res.json(user);
  }

  function logout(req,res) {
    var user = req.body;
    req.logOut();
    res.json(user);
  }

  function register(req, res){
    const user = req.body;
    user['password'] = bcrypt.hashSync(user['password']);
    userModel.createUser(user)
      .then(
        function(user){
          if (user){
            req.login(user, function(err){
              if(err){
                res.status(400).send(err);
              }else{
                res.json(user);
              }
            });
          }
        }
      );
  }

  function loggedin(req, res){
    res.send(req.isAuthenticated() ? req.user: '0');
  }

  // user server model
  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser)
      .then(function (user) {
        res.status(200).send(user);
      }, function (error) {
        console.log("create user error: " + error);
        res.status(400);
      })
  }

  // function createUser(req, res) {
  //   var user = req.body;
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].username === user["username"]) {
  //       res.status(404).send("This username is already exist.");
  //       return;
  //     }
  //   }
  //   user._id = Math.round(Math.random() * 1000).toString();
  //   users.push(user);
  //   res.json(user);
  // }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    userModel
      .findUserByCredentials(username, password)
      .then(
        function (user) {
          res.json(user);
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    // var user = null;
    // if (username && password) {
    //   user = users.find(function (user) {
    //     return user.username === username && user.password === password;
    //   });
    // }
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.status(404).send("not found!");
    // }
  }

  // use exec to run the query
  function findUserById(req, res) {
    var userId = req.params["userId"];

    userModel
      .findUserById(userId)
      .then(
        function (user) {
          res.json(user);
        },
        function (err) {
          res.status(400).send(err);
        }
      );
    // var user = null;
    // if (userId) {
    //   user = users.find(function (user) {
    //     return user._id === userId;
    //   });
    // }
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.status(404).send("not found!")
    // }
  }

  function findUserByUsername(req, res) {
    var username = req.query['username'];
    console.log("I am here");
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          console.log(user);
          res.json(user);
        },
        function (err) {
          console.log("error in finduser");
          res.status(400).send(err);
        }
      );
    // var user = null;
    // if (username) {
    //   user = users.find(function (user) {
    //     return user.username === username;
    //   });
    // }
    // if (user) {
    //   res.json(user);
    // } else {
    //   res.status(404).send("not found!");
    // }
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    console.log("update user: " + userId + " " + user.username);
    userModel
      .updateUser(userId, user)
      .then(
        function (user) {
          res.json(user);
        },
        function (err) {
          res.status(400);
        }
      );
    // for (var i in users) {
    //   if (users[i]._id === userId) {
    //     users[i].username = user.username;
    //     users[i].firstName = user.firstName;
    //     users[i].lastName = user.lastName;
    //     users[i].email = user['email'];
    //     console.log('new uname: ' + users[i].username);
    //     console.log('new fname: ' + users[i].firstName);
    //     res.status(200).send(users[i]);
    //     return;
    //   }
    // }
    // res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel
      .deleteUser(userId)
      .then(
        res.sendStatus(200)
      );
    // for (const i in users) {
    //   if (users[i]._id === userId) {
    //     const j = +i;
    //     res.json(users[i]);
    //
    //     console.log('delete user: ' + userId);
    //
    //     users.splice(j, 1);
    //     return;
    //   }
    // }
  }
}

