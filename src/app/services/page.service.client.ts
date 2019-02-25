import { Injectable } from '@angular/core';
import { Page } from '../models/page.model.client';

@Injectable()
export class PageService {

  constructor() { }

  pages: Page[] = [
    { _id: '321', name: 'Post 1', websiteId: '456', title: 'Lorem' },
    { _id: '432', name: 'Post 2', websiteId: '890', title: 'Lorem' },
    { _id: '543', name: 'Post 3', websiteId: '890', title: 'Lorem' },
    { _id: '654', name: 'Post 2', websiteId: '567', title: 'Lorem' },
    { _id: '765', name: 'Post 3', websiteId: '567', title: 'Lorem' }
  ];

  api = {
    'createPage': this.createPage,
    'findPageByWebsiteId': this.findPageByWebsiteId,
    'findPageById': this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage': this.deletePage
  };

  createPage(websiteId, page) {
    page._id = (Number(this.pages[this.pages.length - 1]._id) + 1).toString();
    this.pages.push(page);
  }

  findPageByWebsiteId(websiteId) {
    return this.pages.filter(function(page) {
      return page.websiteId === websiteId;
    });
  }

  findPageById(pageId) {
    return this.pages.find(function(page) {
      return page._id === pageId;
    });
  }

  updatePage(pageId, page) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        this.pages[i].name = page.name;
        this.pages[i].title = page.title;
        return;
      }
    }
  }

  deletePage(pageId) {
    for (const i in this.pages) {
      if (this.pages[i]._id === pageId) {
        const j = +i;
        this.pages.splice(j, 1);
        return;
      }
    }
  }
}
