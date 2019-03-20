module.exports = function (app) {

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsiteForUser);
  app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
  app.put("/api/user/:userId/website/:websiteId", updateWebsite);
  app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);


  websites = [
    { _id: "123", name: "Facebook", developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter",  developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo",  developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go",       developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
  ]

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    this.websites.push(website);
    var websites = getWebsitesForUserId(userId);
    res.json(websites);
  }

  function findAllWebsiteForUser(req, res) {
    var userId = req.params['userId'];
    var webs = getWebsitesForUserId(userId);
    res.json(webs);
  }

  function findWebsiteById(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    for(var i in websites){
      if(websites[i]._id === websiteId){
        res.send(websites[i]);
        return;
      }
    }
    res.send();
  }

  function updateWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var newWebSite = req.body;
    for (var i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i] = newWebSite;
        break;
      }
    }
    res.json(getWebsitesForUserId(userId));
  }

  function deleteWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    for (var i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        this.websites.splice(i, 1);
        var websites = getWebsitesForUserId(userId);
        res.json(websites);
        return;
      }
    }

  }

  function getWebsitesForUserId(userId) {
    var webs = [];
    for (var i = 0; i < this.websites.length; i++) {
      if (this.websites[i].developerId === userId) {
        webs.push(this.websites[i]);
      }
    }
    return webs;
  }

  function getWebsiteById(websiteId) {
    for (var i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        return this.websites[i];
      }
    }
  }
}
