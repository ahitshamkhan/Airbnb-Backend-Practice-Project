const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = class BookingModel {
  static addBooking(homeId) {
    // Check if already booked
    return Booking.findOne({ homeId: homeId }).then((existing) => {
      if (existing) {
        return Promise.reject("Home is already booked");
      }
      // Not booked yet → insert it
      return new Booking({ homeId: homeId }).save();
    });
  }

  static removeBooking(homeId) {
    return Booking.deleteOne({ homeId: homeId });
  }

  static getBookings() {
    return Booking.find().then((bookings) => {
      // Return array of homeId strings
      return bookings.map((b) => b.homeId.toString());
    });
  }
};
