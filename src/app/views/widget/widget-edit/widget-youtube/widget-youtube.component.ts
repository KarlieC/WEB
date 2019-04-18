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
  widget = {
    _id: '',
    widgetType: '',
    pageId: '',
    size: 0,
    url: '',
    width: '',
    text: '',
    name: ''
  };
  widgets: Widget[];
  errorFlag: boolean;
  errorMsg = 'Please enter widget name.';
  @ViewChild('f') widgetForm: NgForm;
  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
      this.widgetId = params['wgid'];
    });
    this.widgetService.findWidgetById(this.widgetId).subscribe(data => {
      this.widget = data;
      console.log(this.widget);
    });
  }

  updateWidget() {
    this.errorFlag = false;
    if (this.widgetForm.value.youtubename) {
      this.widget.name = this.widgetForm.value.youtubename;
    }
    if (this.widgetForm.value.youtubetext) {
      this.widget.text = this.widgetForm.value.youtubetext;
    }
    if (this.widgetForm.value.youtubeurl) {
      this.widget.url = this.widgetForm.value.youtubeurl;
    }
    if (this.widgetForm.value.youtubewidth) {
      this.widget.width = this.widgetForm.value.youtubewidth;
    }
    if (!this.widget.name) {
      this.errorFlag = true;
    } else {
      console.log('updating... new widget name');
      this.widgetService.updateWidget(this.widgetId, this.widget).subscribe(
        (data: any) => {
          console.log('updated name ' + this.widget.name);
          // this.curWidget = data;
          const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
          this.router.navigateByUrl(url);
          alert('update succeed');
        }, (error: any) => {
          alert ('update error');
        }
      );
    }
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
