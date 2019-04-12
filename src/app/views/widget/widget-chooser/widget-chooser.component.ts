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
  widget: Widget;

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
    console.log('creating heading');
    this.widget = new Widget('', 'HEADING', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        console.log('newWidget ' + data);
        this.widget = data;
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + this.widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }

  createWidgetImage() {
    this.widget = new Widget('', 'IMAGE', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('image new ' + this.widget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + this.widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }
  createWidgetYoutube() {
    this.widget = new Widget('', 'YOUTUBE', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('youtube new ' + this.widget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + this.widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }

  createWidgetHtml() {
    this.widget = new Widget('', 'HTML', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('html new ' + this.widget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + this.widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }

  createWidgetText() {
    this.widget = new Widget('', 'TEXT', this.pageId, 0, 'text', '100%', 'url');
    this.widgetService.createWidget(this.pageId, this.widget).subscribe(
      (data: any) => {
        this.widget = data;
        console.log('text new ' + this.widget);
        const url = '/user/' + this.userId + '/website/' + this.websiteId
          + '/page/' + this.pageId + '/widget/' + this.widget._id;
        this.router.navigateByUrl(url);
      }
    );
  }
}
