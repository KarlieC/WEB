import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {
  userId: string;
  widget = {
    _id: '',
    name: '',
    widgetType: 'HTML',
    pageId: '',
    size: 0,
    text: '',
    url: '',
    width: ''
  };
  widgets;
  widgetId: string;
  websiteId: string;
  pageId: string;
  errorFlag: boolean;
  errorMsg = 'Please enter widget name.';
  updateMsg = 'Update information!';
  @ViewChild('f') widgetForm: NgForm;

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) {
  }

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
          console.log('HTML Widget ' + this.widget.name);
        }
      );
  }

  updateWidget() {
    this.errorFlag = false;
    if (this.widgetForm.value.htmlname) {
      this.widget.name = this.widgetForm.value.htmlname;
    }
    if (!this.widget.name) {
      this.errorFlag = true;
    } else {
      if (this.widgetId === undefined) {
        this.widget.widgetType = 'HTML';
        this.widget.pageId = this.pageId;
        this.widgetService.createWidget(this.pageId, this.widget)
          .subscribe(
            (widget: Widget) => {
              this.widget = widget;
              console.log('update ' + this.widgetId);
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          );
      } else {
        this.widgetService.updateWidget(this.widgetId, this.widget)
          .subscribe(
            (widget: Widget) => {
              this.widget = widget;
              alert(this.updateMsg);
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          );
      }
    }
  }

  placeholderName() {
    return this.widget.name;
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        (data: any) => {
          const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget';
          this.router.navigateByUrl(url);
        },
        (error: any) => console.log(error)
      );
  }

}

