module.exports = function (app) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({dest: __dirname + '/../../dist/my-project/assets/uploads/'});
  var widgetModel = require("../model/widget/widget.model.server");

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);

  // widgets = [
  //   {_id: '123', widgetType: 'HEADING', pageId: '321', size: 1, text: 'GIZMODO'},
  //   {_id: '234', widgetType: 'HEADING', pageId: '321', size: 3, text: 'Lorem ipsum'},
  //   {
  //     _id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%',
  //     url: 'http://lorempixel.com/400/200/'
  //   },
  //   {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
  //   {_id: '567', widgetType: 'HEADING', pageId: '321', size: 3, text: 'Lorem ipsum'},
  //   {
  //     _id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%',
  //     url: 'https://www.youtube.com/embed/AM2Ivdi9c4E'
  //   },
  //   {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'}
  // ];

  function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel.createWidget(pageId, widget).then(
      function (widget) {
        res.json(widget);
      },
      function (error) {
        res.send(error);
      }
    );
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetModel.findAllWidgetsForPage(pageId).then(
      function (pages) {
        res.send(pages);
      },
      function (error) {
        res.send(error);
      }
    );
  }

  function findWidgetById(req, res) {
    var widId = req.params['widgetId'];
    widgetModel.findWidgetById(widId).then(
      function (widget) {
        res.json(widget);
      },
      function (error) {
        res.send(error);
      }
    )
  }

  function updateWidget(req, res) {
    var widId = req.params['widgetId'];
    var widget = req.body;
    console.log('update wid in service ' + widId);
    widgetModel.updateWidget(widId, widget).then(
      function (widget) {
        res.json(widget);
      },
      function (error) {
        res.send(error);
      }
    );
  }

  function deleteWidget(req, res) {
    var widId = req.params['widgetId'];
    console.log("delete widget" + widId);
    widgetModel.deleteWidget(widId).then(
      function (widget) {
        res.send(widget);
      },
      function (error) {
        res.send(error);
      }
    );
  }

  function reorderWidgets(req, res) {
    var startIndex = parseInt(req.query["start"]);
    var endIndex = parseInt(req.query["end"]);

    array_swap(widgets, startIndex, endIndex);
    // res.sendStatus(200);
  }

  function array_swap(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  };

  function uploadImage(req, res) {
    // upload(req, res, (err) => {
    //   if (err) {
    //   } else {
    if (req.file === undefined) {
    } else {
      var userId = req.body.userId;
      var websiteId = req.body.websiteId;
      var pageId = req.body.pageId;
      var widgetId = req.body.widgetId;
      var width = req.body.width;
      var name = req.body.name;
      var text = req.body.text;
      var myFile = req.file;

      if (myFile == null) {
        //res.redirect("https://webdev-spring-2019.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        // res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        return;
      }

      var originalname = myFile.originalname; // file name on user's computer
      var filename = myFile.filename;     // new file name in upload folder
      var path = myFile.path;         // full path of uploaded file
      var destination = myFile.destination;  // folder where file is saved to
      var size = myFile.size;
      var mimetype = myFile.mimetype;
      var url = '/assets/uploads/' + filename;
      var newWidget = {url: url, size: size};

      // var initialUrl = 'assets/uploads/' + filename;
      // var widget = {url: "assets/uploads/" + filename};
      //
      // var widget;
      widgetModel.updateWidget(widgetId, newWidget).then(
        function (widget) {
          // res.send(widget);
        },
        function (error) {
          res.status(400).send(error);
        }
      );
    }
    // }
    // });
  }

  // widgets[i].url = 'dist/my-project/assets/uploads/' + filename;

  // res.redirect("https://webdev-spring-2019.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
  // res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

}

