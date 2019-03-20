
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Widget} from '../models/widget.model.client';

@Injectable()
export class WidgetService {

  constructor(private _http: HttpClient) {
  }

  baseUrl = environment.baseUrl;

  createWidget(pageId, widget) {
    return this._http.post(this.baseUrl + '/api/page/' + pageId + '/widget', widget);
    // widget._id = (Number(this.widgets[this.widgets.length - 1]._id) + 1).toString();
    // this.widgets.push(widget);
    // return widget._id;
  }

  findWidgetsByPageId(pageId) {
    return this._http.get<Widget[]>(this.baseUrl + '/api/page/' + pageId + '/widget');
    // return this.widgets.filter(function (widget) {
    //   return widget.pageId === pageId;
    // });
  }

  findWidgetById(widgetId) {
    return this._http.get<Widget>(this.baseUrl + '/api/widget/' + widgetId);
    // return this.widgets.find(function (widget) {
    //   return widget._id === widgetId;
    // });
  }

  updateWidget(widgetId, widget) {
    return this._http.put<Widget>(this.baseUrl + '/api/widget/' + widgetId, widget);
    // for ( const i in this.widgets ) {
    //   if ( this.widgets[i]._id === widgetId ) {
    //     switch (widget.widgetType) {
    //       case 'HEADER':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].size = widget.size;
    //         return true;
    //
    //       case 'IMAGE':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].url = widget.url;
    //         this.widgets[i].width = widget.width;
    //         // console.log(widget.width);
    //         // // console.log(this.widgets[i].width);
    //         return true;
    //
    //       case 'YOUTUBE':
    //         this.widgets[i].text = widget.text;
    //         this.widgets[i].url = widget.url;
    //         this.widgets[i].width = widget.width;
    //         return true;
    //     }
    //
    //   }
    // }
    // return false;
  }

  deleteWidget(widgetId) {
    return this._http.delete(this.baseUrl + '/api/widget/' + widgetId);
    // for (let i = 0; i < this.widgets.length; i++) {
    //   if (this.widgets[i]._id === widgetId) {
    //     this.widgets.splice(i, 1);
    //     return;
    //   }
    // }
  }
  reorderWidgets(startIndex, endIndex, pageId) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget?start=' + startIndex + '&end=' + endIndex;
    return this._http.put(url, '');
  }
}


