export class Widget {
  _id: string;
  name: string;
  widgetType: string;
  pageId: string;
  size: number;
  text: string;
  url: string;
  width: string;

  constructor(name = 'name', widgetType, pageId, size= 1, text = 'text', width = '100%', url = 'url') {
    // this._id = _id;
    this.name = name;
    this.widgetType = widgetType;
    this.pageId = pageId;
    this.size = size;
    this.text = text;
    this.url = url;
    this.width = width;
  }
}

// export interface Widget {
//   _id: string;
//   widgetType: string;
//   pageId: string;
// }
//
// export class WidgetHeading implements Widget {
//   _id: string;
//   widgetType: string;
//   pageId: string;
//   size: number;
//   text: string;
//
//   constructor(_id: string, widgetType: string, pageId: string, size: number, text: string) {
//     this._id = _id;
//     this.widgetType = widgetType;
//     this.pageId = pageId;
//     this.size = size;
//     this.text = text;
//   }
// }
//
// export class WidgetImage implements Widget {
//   _id: string;
//   widgetType: string;
//   pageId: string;
//   width: string;
//   url: string;
//
//   constructor(_id: string, widgetType: string, pageId: string, width: string, url: string) {
//     this._id = _id;
//     this.widgetType = widgetType;
//     this.pageId = pageId;
//     this.width = width;
//     this.url = url;
//   }
// }
//
// export class WidgetYoutube implements Widget {
//   _id: string;
//   widgetType: string;
//   pageId: string;
//   width: string;
//   url: string;
//
//   constructor(_id: string, widgetType: string, pageId: string, width: string, url: string) {
//     this._id = _id;
//     this.widgetType = widgetType;
//     this.pageId = pageId;
//     this.width = width;
//     this.url = url;
//   }
// }
//
// export class WidgetHtml implements Widget {
//   _id: string;
//   widgetType: string;
//   pageId: string;
//   text: string;
//
//   constructor(_id: string, widgetType: string, pageId: string, text: string) {
//     this._id = _id;
//     this.widgetType = widgetType;
//     this.pageId = pageId;
//     this.text = text;
//   }
// }
