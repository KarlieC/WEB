export class Page {
  _id: String;
  name: String;
  websiteId: String;
  title: String;

  constructor(name, websiteId, title) {
    // this._id = _id;
    this.name = name;
    this.websiteId = websiteId;
    this.title = title;
  }
}
