const { getDb } = require("../utils/databaseutil");
const { ObjectId } = require("mongodb");

module.exports = class Booking {
  static addBooking(homeId) {
    const db = getDb();

    // First check if this home is already booked
    return db
      .collection("bookings")
      .findOne({ homeId: new ObjectId(homeId) })
      .then((existing) => {
        if (existing) {
          return Promise.reject("Home is already booked");
        }
        // Not booked yet → insert it
        return db
          .collection("bookings")
          .insertOne({ homeId: new ObjectId(homeId) });
      });
  }

  static removeBooking(homeId) {
    const db = getDb();
    return db
      .collection("bookings")
      .deleteOne({ homeId: new ObjectId(homeId) });
  }

  static getBookings() {
    const db = getDb();
    return db
      .collection("bookings")
      .find()
      .toArray()
      .then((bookings) => {
        // Return array of homeId strings
        return bookings.map((b) => b.homeId.toString());
      });
  }
};
