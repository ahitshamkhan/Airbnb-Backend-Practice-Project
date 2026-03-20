const registerhomes = [];

module.exports = class Home {
  constructor(houseName) {
    this.houseName = houseName;
  }

  save() {
    registerhomes.push(this);
  }

  static fetchAll(callback) {
    callback(registerhomes);
  }
};
