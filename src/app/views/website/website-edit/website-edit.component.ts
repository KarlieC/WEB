import {Component, OnInit, ViewChild} from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})

export class WebsiteEditComponent implements OnInit {

  userId: String;
  curWebsite = {
    _id: '',
    websiteName: '',
    developerId: '',
    description: ''
  };
  websiteId: String;
  // name: String;
  // description: String;
  websites: Website[];
  @ViewChild('f') websiteForm: NgForm;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
    this.websiteService.findAllWebsiteForUser(this.userId).subscribe(
      (data: any) => {
        console.log(data[0]);
        console.log(data[1]);
        this.websites = data;
      });
    console.log('website id ' + this.websiteId);
    this.websiteService.findWebsiteById(this.userId.toString(), this.websiteId.toString()).subscribe(
      (data: any) => {
        console.log('find curweb');
        console.log(data);
        this.curWebsite = data;
      });

  }


  updateWebsite() {
    if (this.websiteForm.value.name) {
      this.curWebsite.websiteName = this.websiteForm.value.name;
    }
    if (this.websiteForm.value.description) {
      this.curWebsite.description = this.websiteForm.value.description;
    }
    this.websiteService.updateWebsite(this.userId, this.websiteId, this.curWebsite).subscribe((data: any) => {
      console.log('updated name ' + this.curWebsite.websiteName);
      alert('update succeed!');
      this.router.navigateByUrl('/user/' + this.userId + '/website');
      // this.router.navigate(['/usr/' + this.userId + '/website']);
    });
  }


  deleteWebsite() {
    this.websiteService.deleteWebsite(this.userId, this.websiteId).subscribe(website => {
      this.router.navigateByUrl('/user/' + this.userId + '/website');
    });
  }

  placeholderName() {
    return this.curWebsite.websiteName;
  }

  placeholderDescription() {
    return this.curWebsite.description;
  }
}
