import {Injectable} from '@angular/core';
import {Page} from '../models/page.model.client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PageService {
  constructor(private _http: HttpClient) {}

  baseUrl = environment.baseUrl;



  createPage(websiteId, page) {
    return this._http.post<Page>(this.baseUrl + '/api/website/' + websiteId + '/page', page);
    // page._id = (Number(this.pages[this.pages.length - 1]._id) + 1).toString();
    // this.pages.push(page);
  }

  findPageByWebsiteId(websiteId) {
    return this._http.get<Page[]>(this.baseUrl + '/api/website/' + websiteId + '/page');
    // return this.pages.filter(function(page) {
    //   return page.websiteId === websiteId;
    // });
  }

  findPageById(pageId) {
    return this._http.get<Page>(this.baseUrl + '/api/page/' + pageId);
    // return this.pages.find(function(page) {
    //   return page._id === pageId;
    // });
  }

  updatePage(pageId, page) {
    return this._http.put<Page>(this.baseUrl + '/api/page/' + pageId, page);
    // for (const i in this.pages) {
    //   if (this.pages[i]._id === pageId) {
    //     this.pages[i].name = page.name;
    //     this.pages[i].title = page.title;
    //     return;
    //   }
    // }
  }

  deletePage(pageId) {
    return this._http.delete(this.baseUrl + '/api/page/' + pageId);
    // for (const i in this.pages) {
    //   if (this.pages[i]._id === pageId) {
    //     const j = +i;
    //     this.pages.splice(j, 1);
    //     return;
    //   }
    // }
  }
}
