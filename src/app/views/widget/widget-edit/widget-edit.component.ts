import {Component, OnInit} from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
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

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
        this.widgetId = params['wgid'];
        this.pageId = params['pid'];
        this.widgetService.findWidgetById(this.widgetId).subscribe((data: any) => {
          this.widget = data;
          console.log(this.widget);
        });
      }
    );
  }
}
