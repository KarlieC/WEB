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
  curPage = {
    name: '',
    websiteId: '',
    title: ''
  };
  // name: String;
  // title: String;
  pages: Page[];
  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
    this.pageService.findPageById(this.pageId)
      .subscribe((data: any) => {
        console.log(data);
        this.curPage = data;
      });
    // this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
    // this.name = this.curPage.name;
    // this.title = this.curPage.title;
  }

  editPage() {
    if (this.pageForm.value.pageName) {
      this.curPage.name = this.pageForm.value.pageName;
    }
    if (this.pageForm.value.pageTitle) {
      this.curPage.title = this.pageForm.value.pageTitle;
    }
    this.pageService.updatePage(this.pageId, this.curPage).subscribe(
      (data: any ) => {
        console.log('updated name ' + this.curPage.name);
        console.log(data);
        const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId;
        this.router.navigateByUrl(url);
        alert('update success!');
      }, (error: any) => {
        alert ('update error');
      }
    );
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe(
      (data: any) => {
        this.pages = data;
        console.log(this.pages);
        const url = '/user/' + this.userId + '/website/' + this.websiteId + '/page';
        this.router.navigateByUrl(url);
      }
    );
  }

  placeholderName() {
    return this.curPage.name;
  }

  placeholderTitle() {
    return this.curPage.title;
  }
}
