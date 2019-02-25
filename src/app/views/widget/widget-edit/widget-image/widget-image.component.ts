import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

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
  // newUpload: File;
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
    this.newName = this.widgetForm.value.imagename;
    this.newText = this.widgetForm.value.imagetext;
    this.newUrl = this.widgetForm.value.imageurl;
    this.newWidth = this.widgetForm.value.imagewidth;
    // console.log(this.newWidth);
    this.updatedWidget = new Widget(this.widgetId, 'IMAGE', this.pageId
      , '', this.newText, this.newWidth, this.newUrl);
    this.widgetService.updateWidget(this.widgetId, this.updatedWidget);
    // const w = this.widgetService.findWidgetById(this.widgetId);
    // console.log(this.updatedWidget.text);
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
