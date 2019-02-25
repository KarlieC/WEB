import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  curWidget: Widget;
  updatedWidget: Widget;
  newName: string;
  newText: string;
  newSize: string;
  // isNewWidget: boolean;
  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
    this.curWidget = this.widgetService.findWidgetById(this.widgetId);
    // const widget: Widget = this.widgetService.findWidgetById(this.widgetId);
    // if (widget) {
    //   this.text = widget.text;
    //   this.size = widget.size;
    //   this.isNewWidget = false;
    // } else {
    //   this.isNewWidget = true;
    // }
  }

  placeholderName() {
    return this.curWidget.name;
  }

  placeholderText() {
    return this.curWidget.text;
  }

  placeholderSize() {
    return this.curWidget.size;
  }

  updateWidget() {
    this.newName = this.widgetForm.value.headingname;
    this.newText = this.widgetForm.value.headingtext;
    this.newSize = this.widgetForm.value.headingsize;
    this.updatedWidget = new Widget(this.widgetId, 'HEADER', this.pageId
      , this.newSize, this.newText, '100%', 'url');
    this.widgetService.updateWidget(this.widgetId, this.updatedWidget);
  }
}
