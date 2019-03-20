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
  newWeb: Website;
  websites: Website[];
  errorFlag: boolean;
  errorMsg = 'Please enter website name and description.';
  @ViewChild('f') websiteForm: NgForm;

  constructor(private websiteService: WebsiteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.userId = params['uid'];
        }
      );
    this.websiteService.findAllWebsiteForUser(this.userId)
      .subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    // this.activatedRoute.params.subscribe((params: Params) => {
    //       this.userId = params['uid'];
    //     }
    //   );
    // this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  createWebsite() {
    // this.errorFlag = false;
    const websiteName = this.websiteForm.value.newName;
    const websiteDescription = this.websiteForm.value.newDescription;
    this.newWeb = new Website('', websiteName, this.userId, websiteDescription);
    this.websiteService.createWebsite(this.userId, this.newWeb).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/user/' + this.userId + '/website');
        this.websiteService.findAllWebsiteForUser(this.userId).subscribe((webs: any) => {
          this.websites = webs;
        });
      }
    );
  }

}
