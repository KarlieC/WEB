module.exports = function (app) {

  // post
  app.post("/api/website/:websiteId/page", createPage);
  // get
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  // put
  app.put("/api/page/:pageId", updatePage);
  // delete
  app.delete("/api/page/:pageId", deletePage);

  var pageModel = require('../model/page/page.model.server');

  // pages = [
  //   { _id: "321", name: "Post 1", websiteId: "890", title: "Lorem" },
  //   { _id: "432", name: "Post 2", websiteId: "890", title: "Lorem" },
  //   { _id: "543", name: "Post 3", websiteId: "890", title: "Lorem" }
  // ];

  function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var newpage = req.body;
    pageModel.createPage(websiteId, newpage)
      .then(
        function(page){
        res.json(page);
        },
        function(error){
        res.status(400).send(error);
        }
      );
    // for (var i = 0; i < pages.length; i++) {
    //   if (pages[i].websiteId === page.websiteId && pages[i].name === page.name) {
    //     res.status(404).send("This page has already existed.");
    //     return;
    //   }
    // }
    // page._id = Math.random().toString();
    // page.websiteId = websiteId;
    // pages.push(page);
    // res.json(page);
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel.findAllPagesForWebsite(websiteId).then(
      function(pages){
        res.send(pages);
      },
      function(error){
        res.status(400).send(error);
      }
    );
    // var resultSet = [];
    // for (var x = 0; x < pages.length; x++) {
    //   if (pages[x].websiteId === websiteId) {
    //     resultSet.push(pages[x]);
    //   }
    // }
    // res.json(resultSet);
  }

  function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel.findPageById(pageId).then(
      function(page){
        res.json(page);
      },
      function(error){
        res.status(400).send(error);
      }
    );
  }

  function updatePage(req, res) {
    var pageId = req.params.pageId;
    var updatedPage = req.body;
    pageModel.updatePage(pageId,updatedPage).then(
      function(page){
        res.json(page);
      },
      function(error){
        res.status(400).send(error);
      }
    )
  }

  function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel.deletePage(pageId).then(
      function(page){
        res.send(page);
      },
      function(error){
        res.status(400).send(error);
      }
    );
  }
}
