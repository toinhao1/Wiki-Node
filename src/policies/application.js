module.exports = class ApplicationPolicy {

  constructor(user, record) {
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
    return this.new() &&
      this.record && (this._isOwner() || this._adminAcct());
      this.record && (this._isOwner() || this._standardAcct());
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
}
