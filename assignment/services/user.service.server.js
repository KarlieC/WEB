module.exports = function (app) {

  app.get("/api/user/hello", helloUser)

  app.post("/api/user", createUser);
  app.get("/api/user", findUserByCredentials);
  app.get("/api/user/:userId", findUserById)
  app.get("/api/user", findUserByUsername);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);


  users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonderland"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
  ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function createUser(req, res) {
    var user = req.body;
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === user["username"]) {
        res.status(404).send("This username is already exist.");
        return;
      }
    }
    user._id = Math.round(Math.random() * 1000).toString();
    users.push(user);
    res.json(user);
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var user = null;
    if (username && password) {
      user = users.find(function (user) {
        return user.username === username && user.password === password;
      });
    }
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("not found!");
    }
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];
    var user = null;
    if (userId) {
      user = users.find(function (user) {
        return user._id === userId;
      });
    }
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("not found!")
    }
  }

  function findUserByUsername(req, res) {
    var username = req.query(username);
    var user = null;
    if (username) {
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("not found!");
    }
  }

  // function findAllUsers(req, res){
  //   res.json(users);
  // }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    console.log("update user: " + userId + " " + user.username);
    for (var i in users) {
      if (users[i]._id === userId) {
        users[i].username = user.username;
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;
        users[i].email = user['email'];
        console.log('new uname: ' + users[i].username);
        console.log('new fname: ' + users[i].firstName);
        res.status(200).send(users[i]);
        return;
      }
    }
    res.status(404).send("not found!");
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    for (const i in users) {
      if (users[i]._id === userId) {
        const j = +i;
        res.json(users[i]);

        console.log('delete user: ' + userId);

        users.splice(j, 1);
        return;
      }
    }
  }
}
