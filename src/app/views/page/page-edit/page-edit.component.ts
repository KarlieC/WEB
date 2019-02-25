import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  curPage: Page;
  name: String;
  title: String;
  pages: Page[];
  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
    this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
    this.curPage = this.pageService.findPageById(this.pageId);
    this.name = this.curPage.name;
    this.title = this.curPage.title;
  }

  editPage() {
    const updatedPage = new Page(undefined
      , this.pageForm.value.pageName
      , this.websiteId
      , this.pageForm.value.pageTitle);
    this.pageService.updatePage(this.pageId, updatedPage);
    this.router.navigate(['user/' + this.userId + '/website/' + this.websiteId + '/page']);

  }

  deletePage() {
    this.pageService.deletePage(this.pageId);
    this.router.navigate(['user/' + this.userId + '/website/' + this.websiteId + '/page']);
  }

  placeholderName() {
    return this.curPage.name;
  }

  placeholderTitle() {
    return this.curPage.title;
  }
}
