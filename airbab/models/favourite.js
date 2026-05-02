const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = class FavouriteModel {
  static addToFavourite(homeId) {
    return Favourite.findOne({ homeId: homeId }).then((existing) => {
      if (existing) {
        return Promise.reject("Home is already marked as favourite");
      }
      return new Favourite({ homeId: homeId }).save();
    });
  }

  static removeFavourite(homeId) {
    return Favourite.deleteOne({ homeId: homeId });
  }

  static getFavourites() {
    return Favourite.find().then((favourites) => {
      return favourites.map((f) => f.homeId.toString());
    });
  }
};
