import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  curWidget: Widget;
  updatedWidget: Widget;
  newName: string;
  newText: string;
  newUrl: string;
  newWidth: string;
  @ViewChild('f') widgetForm: NgForm;
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
    this.curWidget = this.widgetService.findWidgetById(this.widgetId);
  }

  updateWidget() {
    this.newName = this.widgetForm.value.youtubename;
    this.newText = this.widgetForm.value.youtybetext;
    this.newUrl = this.widgetForm.value.youtubeurl;
    this.newWidth = this.widgetForm.value.youtubewidth;
    this.updatedWidget = new Widget(this.widgetId, 'YOUTUBE', this.pageId
      , '', this.newText, this.newWidth, this.newUrl);
    // console.log(this.newWidth);
    this.widgetService.updateWidget(this.widgetId, this.updatedWidget);
  }

  placeholderName() {
    return this.curWidget.name;
  }

  placeholderText() {
    return this.curWidget.text;
  }

  placeholderUrl() {
    return this.curWidget.url;
  }
  placeholderWidth() {
    return this.curWidget.width;
  }
}
