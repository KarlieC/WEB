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
  curWebsite: Website;
  websiteId: String;
  name: String;
  description: String;
  websites: Website[];
  @ViewChild('f') websiteForm: NgForm;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    this.curWebsite = this.websiteService.findWebsiteById(this.websiteId);
    this.name = this.curWebsite.name;
    this.description = this.curWebsite.description;
  }

  updateWebsite() {
    const updatedWebsite = new Website(this.websiteId
      , this.websiteForm.value.newName
      , this.userId
      , this.websiteForm.value.newDescription);
    this.websiteService.updateWebsite(this.websiteId, updatedWebsite);
    this.router.navigate(['user/' + this.userId + '/website']);
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId);
    this.router.navigate(['user/' + this.userId + '/website']);
  }

  placeholderName() {
    return this.curWebsite.name;
  }

  placeholderDescription() {
    return this.curWebsite.description;
  }
}
