import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {

  userId: string;
  websites: Website[];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute,
              private shareService: SharedService) { }

  ngOnInit() {
    console.log(this.shareService.user);
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params.uid;
        console.log('this userid: ' + this.userId);
      });
    this.websiteService.findAllWebsiteForUser(this.userId).subscribe(
      (data: any) => {
      this.websites = data;
    });
    // this.activatedRoute.params.subscribe( (params: any) => {
    //   this.userId = params['uid'];
    // });
    // this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }
}
