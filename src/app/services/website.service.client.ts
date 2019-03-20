import {Injectable} from '@angular/core';
import {Website} from '../models/website.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class WebsiteService {

  constructor(private _http: HttpClient) {}

  baseUrl = environment.baseUrl;

  createWebsite(userId: String, website: Website) {
    return this._http.post(this.baseUrl + '/api/user/' + userId + '/website', website);
    // website._id = (Number(this.websites[this.websites.length - 1]._id) + 1).toString();
    // website.developerId = userId;
    // this.websites.push(website);
  }

  findAllWebsiteForUser(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/website');
    // return this.websites.filter(function(website) {
    //   return website.developerId === userId;
    // });
  }

  findWebsiteById(userId: String, websiteId: String) {
    console.log('find websitebyid client');
    return this._http.get(this.baseUrl + '/api/user/' + userId + '/website/' + websiteId);
    // return this.websites.find(function(website) {
    //   console.log(websiteId);
    //     return website._id === websiteId;
    //   });
  }

  updateWebsite(userId: String, websiteId: String, website) {
    return this._http.put(this.baseUrl + '/api/user/' + userId + '/website/' + websiteId, website);
    // for (let i = 0; i < this.websites.length; i++) {
    //   if (this.websites[i]._id === websiteId) {
    //     this.websites[i] = website;
    //     return;
    //   }
    // }
  }

  deleteWebsite(userId: String, websiteId: String) {
    return this._http.delete(this.baseUrl + '/api/user/' + userId + '/website/' + websiteId);
    // for (const i in this.websites) {
    //   if (this.websites[i]._id === websiteId) {
    //     const j = +i;
    //     this.websites.splice(j, 1);
    //     return;
    //   }
    // }
  }
}

