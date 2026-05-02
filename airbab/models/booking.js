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
    return Booking.findOne({ homeId: homeId }).then((existing) => {
      if (existing) {
        return Promise.reject("Home is already booked");
      }
      return new Booking({ homeId: homeId }).save();
    });
  }

  static removeBooking(homeId) {
    return Booking.deleteOne({ homeId: homeId });
  }

  static getBookings() {
    return Booking.find().then((bookings) => {
      return bookings.map((b) => b.homeId.toString());
    });
  }
};
