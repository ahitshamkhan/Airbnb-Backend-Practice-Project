const { getDb } = require("../utils/databaseutil");
const { ObjectId } = require("mongodb");

module.exports = class Favourite {
  static addToFavourite(homeId) {
    const db = getDb();

    // First check if already in favourites
    return db
      .collection("favourites")
      .findOne({ homeId: new ObjectId(homeId) })
      .then((existing) => {
        if (existing) {
          return Promise.reject("Home is already marked as favourite");
        }
        // Not favourited yet → insert it
        return db
          .collection("favourites")
          .insertOne({ homeId: new ObjectId(homeId) });
      });
  }

  static removeFavourite(homeId) {
    const db = getDb();
    return db
      .collection("favourites")
      .deleteOne({ homeId: new ObjectId(homeId) });
  }

  static getFavourites() {
    const db = getDb();
    return db
      .collection("favourites")
      .find()
      .toArray()
      .then((favourites) => {
        // Return array of homeId strings
        return favourites.map((f) => f.homeId.toString());
      });
  }
};
