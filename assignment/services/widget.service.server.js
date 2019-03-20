module.exports = function (app, models) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({dest: __dirname + '/../../dist/my-project/assets/uploads/'});

  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.post("/api/page/:pid/widget", createWidget);
  app.get("/api/page/:pid/widget", findAllWidgetsForPage);
  app.get("/api/widget/:wgid", findWidgetById);
  app.put("/api/widget/:wgid", updateWidget);
  app.delete("/api/widget/:wgid", deleteWidget);

  app.put("/api/page/:pid/widget", reorderWidgets);


  widgets = [
    {_id: '123', widgetType: 'HEADING', pageId: '321', size: 1, text: 'GIZMODO'},
    {_id: '234', widgetType: 'HEADING', pageId: '321', size: 3, text: 'Lorem ipsum'},
    {
      _id: '345', widgetType: 'IMAGE', pageId: '321', width: '100%',
      url: 'http://lorempixel.com/400/200/'
    },
    {_id: '456', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'},
    {_id: '567', widgetType: 'HEADING', pageId: '321', size: 3, text: 'Lorem ipsum'},
    {
      _id: '678', widgetType: 'YOUTUBE', pageId: '321', width: '100%',
      url: 'https://www.youtube.com/embed/AM2Ivdi9c4E'
    },
    {_id: '789', widgetType: 'HTML', pageId: '321', text: '<p>Lorem ipsum</p>'}
  ];

  function createWidget(req, res) {
    var widget = req.body;
    widget._id = Math.random().toString();
    ;
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    var pid = req.params['pid'];
    var result = [];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i].pageId === pid) {
        result.push(widgets[i]);
      }
    }
    res.json(result);
  }

  function findWidgetById(req, res) {
    var wid = req.params['wgid'];
    var widget = widgets.find(function (widget) {
      return widget._id === wid;
    });
    if (widget) {
      res.status(200).send(widget);
    } else {
      res.status(404).send('Widget is Not Found');
    }
  }

  function updateWidget(req, res) {
    var wgid = req.params['wgid'];
    var widget = req.body;
    for (var i = 0; i < widgets.length; ++i) {
      if (widgets[i]._id === wgid) {
        if (widgets[i].widgetType === 'HEADING') {
          widgets[i].name = widget.name;
          widgets[i].size = widget.size;
          widgets[i].text = widget.text;
        } else if (widgets[i].widgetType === 'IMAGE') {
          widgets[i].name = widget.name;
          widgets[i].text = widget.text;
          widgets[i].width = widget.width;
          widgets[i].url = widget.url;
        } else if (widgets[i].widgetType === 'YOUTUBE') {
          widgets[i].name = widget.name;
          widgets[i].text = widget.text;
          widgets[i].width = widget.width;
          widgets[i].url = widget.url;
        }
        res.status(200).send(widget);
        return;
      }
    }
    res.status(404).send("Widget is not found!");
  }

  function deleteWidget(req, res) {
    var wgid = req.params['wgid'];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === wgid) {
        widgets.splice(i, 1);
        res.status(200).send(widgets[i]);
        return;
      }
    }
    res.send(404).send("Widget is not found!");
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
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var widgetId = req.body.widgetId;
    var width = req.body.width;
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

    // var initialUrl = 'assets/uploads/' + filename;
    // var widget = {url: "assets/uploads/" + filename};
    //
    // var widget;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        console.log('cur url ' + widgets[i].url);
        widgets[i].url = 'assets/uploads/' + filename;
        console.log('new url ' + widgets[i].url);
      }
    }
  }

  // widgets[i].url = 'dist/my-project/assets/uploads/' + filename;

  // res.redirect("https://webdev-spring-2019.herokuapp.com/user/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
  // res.redirect("http://localhost:3200/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);

}

