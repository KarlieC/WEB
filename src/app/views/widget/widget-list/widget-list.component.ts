import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgets: Widget[];

  constructor(private widgetService: WidgetService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  getUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  onActivate() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetService.findWidgetsByPageId(this.pageId).subscribe((data: any) => {
          this.widgets = data;
        });
      });
  }

  // receiving the emitted event
  reorderWidgets(indexes) {
    // call widget service function to update widget as per index
    this.widgetService.reorderWidgets(indexes.startIndex, indexes.endIndex, this.pageId)
      .subscribe(
        // (data) => console.log(data)
      );
  }

}
