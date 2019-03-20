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
  curWidget = {
    _id: '',
    widgetType: '',
    pageId: '',
    size: 0,
    url: '',
    width: '',
    text: '',
    name: ''
  };
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
    this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
      this.curWidget = data;
      console.log('curWidge');
      console.log(data);
    });
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
    if (this.widgetForm.value.headingname) {
      this.curWidget.name = this.widgetForm.value.headingname;
    }
    if (this.widgetForm.value.headingtext) {
      this.curWidget.text = this.widgetForm.value.headingtext;
    }
    if (this.widgetForm.value.headingsize) {
      this.curWidget.size = this.widgetForm.value.headingsize;
    }
    this.widgetService.updateWidget(this.widgetId, this.curWidget).subscribe(
      (data: any) => {
        console.log('updated name ' + this.curWidget.name);
        // this.curWidget = data;
        const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigateByUrl(url);
        alert('update succeed');
      }, (error: any) => {
        alert ('update error');
      }
    );
  }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe(
      (data: any) => {
        // this.pages = data;
        // console.log(this.pages);
        const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
        this.router.navigateByUrl(url);
      }
    );
    // this.widgetService.deleteWidget(this.userId, this.websiteId, this.pageId).subscribe(website => {
    //   const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + 'widget';
    //   this.router.navigateByUrl(url);
    // });
  }
}
