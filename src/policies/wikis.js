const ApplicationPolicy = require("./application");

module.exports = class WikiPolicy extends ApplicationPolicy {

  new() {
    return this._standardAcct();
  }
  create() {
    return this.new();
  }
  edit() {
    return this.new() &&
    this.record && (this._isOwner() || this._standardAcct());
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
}
