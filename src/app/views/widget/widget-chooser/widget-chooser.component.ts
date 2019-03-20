import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
// import {Widget, WidgetHeading, WidgetYoutube, WidgetImage, WidgetHtml} from '../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: String;


  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      console.log(params['wid']);
      console.log(params['pid']);
    });
  }

  createWidgetHeading() {
    const widget = new Widget('', '', 'HEADING', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, widget).subscribe(
      (newWidget: Widget) => {
        console.log('newWidget');
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }

  createWidgetImage() {
    const widget = new Widget('', '', 'IMAGE', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, widget).subscribe(
      (newWidget: Widget) => {
        console.log(newWidget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }
  createWidgetYoutube() {
    const widget = new Widget('', '', 'YOUTUBE', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, widget).subscribe(
      (newWidget: Widget) => {
        console.log(newWidget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }
}
