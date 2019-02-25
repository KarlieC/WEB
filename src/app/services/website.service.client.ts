import {Website} from '../models/website.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class WebsiteService {
  websites: Website[] = [
    new Website('123', 'Facebook', '456', 'Lorem'),
    new Website('234', 'Tweeter', '456', 'Lorem'),
    new Website('456', 'Gizmodo', '456', 'Lorem'),
    new Website('890', 'Go', '123', 'Lorem'),
    new Website('567', 'Tic Tac Toe', '123', 'Lorem'),
    new Website('678', 'Checkers', '123', 'Lorem'),
    new Website('789', 'Chess', '234', 'Lorem')
  ];

  constructor() {}

  api = {
    'createWebsite' : this.createWebsite,
    'findWebsitesByUser': this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  createWebsite(userId: String, website: Website) {
    website._id = (Number(this.websites[this.websites.length - 1]._id) + 1).toString();
    website.developerId = userId;
    this.websites.push(website);
  }

  findWebsitesByUser(userId: String) {
    return this.websites.filter(function(website) {
      return website.developerId === userId;
    });
  }
  // findWebsitesByUser(userId) {
  //   const res = [];
  //   for (let i = 0; i < this.websites.length; i++)  {
  //     if (this.websites[i].developerId === userId) {
  //       res.push(this.websites[i]);
  //     }
  //   }
  //   return res;
  // }

  findWebsiteById(websiteId: String) {
    return this.websites.find(function(website) {
      console.log(websiteId);
        return website._id === websiteId;
      });
  }

  updateWebsite(websiteId: String, website) {
    for (let i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i] = website;
        return;
      }
    }
  }

  deleteWebsite(websiteId: String) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        const j = +i;
        this.websites.splice(j, 1);
        return;
      }
    }
  }
}

