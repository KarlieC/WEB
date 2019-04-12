import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  userId: string;
  widget = {
    _id: '',
    widgetType: '',
    pageId: '',
    size: 0,
    url: '',
    width: '',
    text: '',
    name: '',
    rows: 1,
    placeholder: '',
    formatted: true,
  };
  widgets;
  widgetId: string;
  pageId: string;
  websiteId: string;
  updateMsg = 'Update information!';
  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
        }
      );
    this.widgetService.findWidgetById(this.widgetId)
      .subscribe(
        (data: any) => {
          this.widget = data;
        }
      );
  }

  updateWidget() {
    if (this.widgetForm.value.textname) {
      this.widget.name = this.widgetForm.value.textname;
    }
    this.widgetService.updateWidget(this.widgetId, this.widget)
      .subscribe(
        (data: any) => {
          const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
          this.router.navigateByUrl(url);
          // const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId;
          alert('Update succeed');
          // this.router.navigateByUrl(url);
        },
        (error: any) => console.log(error)
      );
  }

  placeholderName() {
    return this.widget.name;
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        (data: any) => {
          const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
          alert('Update succeed');
          this.router.navigateByUrl(url);
        },
        (error: any) => console.log(error)
      );
  }

}

