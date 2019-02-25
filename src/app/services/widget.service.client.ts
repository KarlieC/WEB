import {Injectable} from '@angular/core';
import { Widget } from '../models/widget.model.client';
// import { Widget, WidgetHeading, WidgetImage, WidgetYoutube, WidgetHtml } from '../models/widget.model.client';

@Injectable()
export class WidgetService {

  widgets: Widget[] = [
    new Widget('123', 'HEADER', '432', '1', 'London terror attack: Police fired unprecedented number of rounds'),
    new Widget('124', 'HEADER', '432', '3', 'Counter terrorism officers patrol near the scene of the attack on London Bridge.' ),
    new Widget('125', 'IMAGE', '432', '2', 'text', '100%',
      'http://i2.cdn.cnn.com/cnnnext/dam/assets/170604130220-41-london-bridge-incident-0604-gallery-exlarge-169.jpg'),
    new Widget('126', 'HTML', '432', '2', '<p>blalbla</p >' ),
    new Widget('127', 'YOUTUBE', '432', '2', 'text', '100%', 'https://www.youtube.com/embed/APexI9Zb6iE/' ),

    new Widget('133', 'HEADER', '543', '1', 'London terror attack: Police fired unprecedented number of rounds'),
    new Widget('134', 'HEADER', '543', '3', 'Counter terrorism officers patrol near the scene of the attack on London Bridge.' ),
    new Widget('135', 'IMAGE', '543', '2', 'text', '100%',
      'http://i2.cdn.cnn.com/cnnnext/dam/assets/170604130220-41-london-bridge-incident-0604-gallery-exlarge-169.jpg'),
    new Widget('136', 'HTML', '543', '2', '<p>blalbla</p >' ),
    new Widget('137', 'YOUTUBE', '543', '2', 'text', '100%', 'https://www.youtube.com/embed/APexI9Zb6iE/' ),
  ];

  constructor() {
  }

  // widgets: Widget[] = [
  //   new WidgetHeading('123', 'HEADING', '321', 2, 'GIZMODO'),
  //   new WidgetHeading('234', 'HEADING', '321', 4, 'Lorem ipsum'),
  //   new WidgetImage('345', 'IMAGE', '321', '100%', 'http://lorempixel.com/400/200'),
  //   new WidgetHtml('456', 'HTML', '321', '<p>Lorem ipsum</p>'),
  //   new WidgetHeading('567', 'HEADING', '321', 4, 'Lorem ipsum'),
  //   new WidgetYoutube('678', 'YOUTUBE', '321', '100%', 'https://www.youtube.com//embed/eSLe4HuKuK0'),
  //   new WidgetHtml('789', 'HTML', '321', '<p>Lorem ipsum</p>')
  // ];

  api = {
    createWidget: this.createWidget,
    findWidgetByPageId: this.findWidgetsByPageId,
    findWidgetById: this.findWidgetById,
    updateWidget: this.updateWidget,
    deleteWidget: this.deleteWidget,
  };

  createWidget(pageId, widget) {
    widget._id = (Number(this.widgets[this.widgets.length - 1]._id) + 1).toString();
    this.widgets.push(widget);
    return widget._id;
  }

  findWidgetsByPageId(pageId) {
    return this.widgets.filter(function (widget) {
      return widget.pageId === pageId;
    });
  }

  findWidgetById(widgetId) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId, widget) {
    for ( const i in this.widgets ) {
      if ( this.widgets[i]._id === widgetId ) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            // console.log(widget.width);
            // // console.log(this.widgets[i].width);
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }
  deleteWidget(widgetId) {
    for (let i = 0; i < this.widgets.length; i++) {
      if (this.widgets[i]._id === widgetId) {
        this.widgets.splice(i, 1);
        return;
      }
    }
  }
}


