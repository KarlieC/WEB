import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: string;
  websiteName: string;
  websiteDescription: string;
  websites: Website[];
  errorFlag: boolean;
  errorMsg = 'Please enter website name and description.';
  @ViewChild('f') websiteForm: NgForm;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
          this.userId = params['uid'];
        }
      );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  createWebsite() {
    this.errorFlag = false;
    this.websiteName = this.websiteForm.value.newName;
    this.websiteDescription = this.websiteForm.value.newDescription;
    if (!this.websiteName || !this.websiteDescription) {
      this.errorFlag = true;
    } else {
      this.websiteService.createWebsite(this.userId
        , new Website(undefined, this.websiteName, this.userId, this.websiteDescription));
      console.log(this.websiteName)
      this.router.navigate(['user/' + this.userId + '/website']);
    }
  }
}
