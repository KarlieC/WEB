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
    const newWidget = new Widget('', 'HEADING', this.pageId, '0', 'text');
    this.widgetId = this.widgetService.createWidget(this.pageId, newWidget);
    this.toWidgetEdit(this.widgetId);
  }

  createWidgetImage() {
    const newWidget = new Widget('', 'IMAGE', this.pageId, '1', 'text', '100%');
    this.widgetId = this.widgetService.createWidget(this.pageId, newWidget);
    this.toWidgetEdit(this.widgetId);
  }
  createWidgetYoutube() {
    const newWidget = new Widget('', 'YOUTUBE', this.pageId, '1', 'text', '100%');
    this.widgetId = this.widgetService.createWidget(this.pageId, newWidget);
    this.toWidgetEdit(this.widgetId);
  }

  toWidgetEdit(widgetId) {
    this.router.navigate(['user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + widgetId]);
  }
}
