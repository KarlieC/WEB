var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('Page', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
  return pageModel.create(page)
    .then(
      function (page) {
        websiteModel.findWebsiteById(websiteId)
          .then(
            function (website) {
              website.pages.push(page);
              websiteModel.updateWebsite(websiteId, website);
            }
          );
        return page;
      }
    );
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({websiteId: websiteId});
}

function findPageById(pageId) {
  return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return pageModel.findOneAndUpdate({_id: pageId}, page);
}

function deletePage(pageId) {
  return pageModel.findOneAndDelete({_id: pageId});
}
