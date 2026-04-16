// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const bookingDataPath = path.join(rootDir, "data", "bookings.json");

module.exports = class Booking {
  static addBooking(homeId) {
    return new Promise((resolve, reject) => {
      Booking.getBookings()
        .then((bookings) => {
          if (bookings.includes(homeId)) {
            reject("Home is already booked");
          } else {
            bookings.push(homeId);
            fs.writeFile(bookingDataPath, JSON.stringify(bookings), (err) => {
              if (err) reject(err);
              else resolve();
            });
          }
        })
        .catch(reject);
    });
  }

  static removeBooking(homeId) {
    return new Promise((resolve, reject) => {
      Booking.getBookings()
        .then((bookings) => {
          const updatedBookings = bookings.filter((id) => id !== homeId);
          fs.writeFile(
            bookingDataPath,
            JSON.stringify(updatedBookings),
            (err) => {
              if (err) reject(err);
              else resolve();
            },
          );
        })
        .catch(reject);
    });
  }

  static getBookings() {
    return new Promise((resolve, reject) => {
      fs.readFile(bookingDataPath, (err, data) => {
        if (err) resolve([]);
        else resolve(JSON.parse(data));
      });
    });
  }
};
