var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
  return widgetModel.create(widget)
    .then(
      function (newWidget) {
        pageModel.findPageById(pageId)
          .then(
            function (page) {
              page.widgets.push(newWidget);
              pageModel.updatePage(pageId,page);
            }
          );
        return newWidget;
      }
    );
}

function findAllWidgetsForPage(pageId) {
  return widgetModel.find({pageId: pageId});
}

function findWidgetById(id) {
  return widgetModel.findById(id);
}


function updateWidget(widgetId, widget) {
  return widgetModel.findOneAndUpdate({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  return widgetModel.findOneAndDelete({_id: widgetId});
}

function updatePosition (pageId, start, end) {
  return widgetModel.find({pageId: pageId}).then(
    function(wigs){
      widgetModel.findOneAndUpdate({_id: wigs[start]._id}, {position: end+1},{new: true}).then(
        function(wig){
          console.log(wig);
          wigs[end] = wig;

        }
      )
      widgetModel.findOneAndUpdate({_id: wigs[end]._id}, {position: start+1},{new: true}).then(
        function(wig){
          console.log(wig);
          wigs[end] = wig;

        }
      )
      console.log(wigs[start]);
      console.log(wigs[end]);
      pageModel.findPageById(pageId).then(
        function(page){
          page.widgets = wigs;
          pageModel.updatePage(pageId,page);
        }
      )
      return wigs;
    }
  )
}

function reorderWidget(pageId,start,end) {
  return updatePosition(pageId,start,end);
}
