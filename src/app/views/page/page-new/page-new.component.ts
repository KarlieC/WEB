import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  userId: string;
  websiteId: string;
  name: string;
  title: string;
  // pages: Page[];
  errorFlag: boolean;
  errorMsg = 'Please enter page name and title';
  @ViewChild('f') pageForm: NgForm;

  constructor(private pageService: PageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
    // this.pages = this.pageService.findPageByWebsiteId(this.websiteId);
  }

  createNewPage() {
    this.errorFlag = false;
    this.name = this.pageForm.value.pageName;
    this.title = this.pageForm.value.pageTitle;
    if (!this.name || !this.title) {
      this.errorFlag = true;
    } else {
      const newPage = new Page(this.name, this.websiteId, this.title);
      this.pageService.createPage(this.websiteId, newPage).subscribe(pag => {
        this.router.navigateByUrl('/user/' + this.userId + '/website/' + this.websiteId + '/page');
      });
    }
  }
}
