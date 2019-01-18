module.exports = class ApplicationPolicy {

  constructor(user, record, collaborators) {
    this.user = user;
    this.record = record;
  }
  _standardAcct() {
    return this.user && this.user.role == "standard";
  }
  _adminAcct() {
    return this.user && this.user.role == "admin";
  }
  _premiumAcct() {
    return this.user && this.user.role == "premium";
  }
  _isOwner() {
   return this.record && this.record.userId == this.user.id;
 }
  new() {
    return this.user != null;
  }
  create() {
    return this.new();
  }
  show() {
    return true;
  }
  edit() {
    if(this.record.private == false) {
      return this.new() &&
      this.record && (this._standardAcct() || this._adminAcct() || this._premiumAcct());
    } else if (this.record.private == true) {
      return this.new() &&
      this.record && (this._standardAcct() || this._adminAcct() || this._premiumAcct());
    }
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
  showCollaborators() {
    return this.edit();
  }
}
