// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const bookingDataPath = path.join(rootDir, "data", "bookings.json");

module.exports = class Booking {

  static addBooking(homeId, callback) {
    Booking.getBookings((bookings) => {
      if (bookings.includes(homeId)) {
        callback("Home is already booked");
      } else {
        bookings.push(homeId);
        fs.writeFile(bookingDataPath, JSON.stringify(bookings), callback);
      }
    });
  }

  static removeBooking(homeId, callback) {
    Booking.getBookings((bookings) => {
      const updatedBookings = bookings.filter(id => id !== homeId);
      fs.writeFile(bookingDataPath, JSON.stringify(updatedBookings), callback);
    });
  }

  static getBookings(callback) {
    fs.readFile(bookingDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
