// Core Modules
const db = require("../utils/databaseutil");

module.exports = class Booking {
  static addBooking(homeId) {
    return new Promise((resolve, reject) => {
      // Check if already booked
      db.execute("SELECT * FROM Bookings WHERE Home_ID = ?", [homeId])
        .then(([rows]) => {
          if (rows.length > 0) {
            reject("Home is already booked");
          } else {
            // Add booking
            return db.execute("INSERT INTO Bookings(Home_ID) VALUES (?)", [homeId]);
          }
        })
        .then(() => resolve())
        .catch(reject);
    });
  }

  static removeBooking(homeId) {
    return db.execute("DELETE FROM Bookings WHERE Home_ID = ?", [homeId]);
  }

  static getBookings() {
    return db.execute("SELECT Home_ID FROM Bookings")
      .then(([rows]) => {
        // Convert [{Home_ID: 1}, {Home_ID: 2}] to [1, 2]
        return rows.map(row => row.Home_ID);
      });
  }
};
