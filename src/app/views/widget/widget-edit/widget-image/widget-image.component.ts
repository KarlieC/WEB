import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {
  baseUrl = environment.baseUrl;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget = {
    _id: '',
  name: 'default',
  widgetType: '',
  pageId: '',
  size: 0,
  text: '',
  url: '',
  width: ''
  };
  widgets: Widget[];
  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
    // this.widgetService.findWidgetById(this.widgetId).subscribe(data => {
    //   this.widget = data;
    // });
  }

  updateWidget() {
    this.widgetService.findWidgetById(this.widgetId).subscribe(data => {
      this.widget = data;
      if (this.widgetForm.value.imagename) {
        this.widget.name = this.widgetForm.value.imagename;
      }
      if (this.widgetForm.value.imagetext) {
        this.widget.text = this.widgetForm.value.imagetext;
      }
      // if (this.widgetForm.value.imageurl === this.widget.url) {
      //   this.widget.url = this.widgetForm.value.imageurl;
      // } else {
      //   this.widget.url = this.widgetForm.value.imageurl;
      // }
      if (this.widgetForm.value.imagewidth) {
        this.widget.width = this.widgetForm.value.imagewidth;
      }
      console.log('updating... new widget name');
      this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
        (data1: any) => {
          console.log('image url ' + this.widget.url);
          // this.curWidget = data;
          const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
          this.router.navigateByUrl(url);
          alert('update succeed');
        }, (error: any) => {
          alert ('update error');
        }
      );
    });
    // console.log(this.widget.url);
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        this.widgets = data;
        const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigateByUrl(url);
      }
    );
  }

  placeholderName() {
    return this.widget.name;
  }

  placeholderText() {
    return this.widget.text;
  }

  placeholderUrl() {
    return this.widget.url;
  }

  placeholderWidth() {
    return this.widget.width;
  }
}
