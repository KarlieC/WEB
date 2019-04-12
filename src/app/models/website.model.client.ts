export class Website {
  _id: String;
  websiteName: String;
  developerId: String;
  description: String;

  constructor(websiteName: String, developerId: String, description: String) {
    // this._id = _id;
    this.websiteName = websiteName;
    this.developerId = developerId;
    this.description = description;
  }
}
