const { getDb } = require("../utils/databaseutil");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    const db = getDb();
    if (this.id) {
      // ID exists → UPDATE existing home
      const homeId = this.id;
      delete this.id; // remove id field before updating
      return db
        .collection("homes")
        .updateOne({ _id: new ObjectId(homeId) }, { $set: this });
    } else {
      // No ID → INSERT new home
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findByid(homeID) {
    const db = getDb();
    return db.collection("homes").findOne({ _id: new ObjectId(homeID) });
  }

  static deleteById(homeID) {
    const db = getDb();
    return db.collection("homes").deleteOne({ _id: new ObjectId(homeID) });
  }

  static update(homeID, updatedData) {
    const db = getDb();
    return db
      .collection("homes")
      .updateOne({ _id: new ObjectId(homeID) }, { $set: updatedData });
  }
};
