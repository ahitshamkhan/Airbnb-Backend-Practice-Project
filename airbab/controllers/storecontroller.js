const Favourite = require("../models/favourite");
const Home = require("../models/home");
const Booking = require("../models/booking");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    }),
  );
};

exports.getBookings = (req, res, next) => {
  Booking.getBookings().then((bookingIds) => {
    Home.find().then((registeredHomes) => {
      const bookedHomes = registeredHomes.filter((home) =>
        bookingIds.includes(home._id.toString()),
      );
      res.render("store/bookings", {
        bookedHomes: bookedHomes,
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favouriteIds) => {
    Home.find().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favouriteIds.includes(home._id.toString()),
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddtoFavourite = (req, res, next) => {
  console.log("Came to add to Favourite", req.body);
  Favourite.addToFavourite(req.body.id)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.log("Error while marking favourite:", error);
      res.redirect("/favourites");
    });
};

exports.postRemoveFavourite = (req, res, next) => {
  Favourite.removeFavourite(req.body.id)
    .then(() => {
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.log("Error while removing favourite:", error);
      res.redirect("/favourites");
    });
};

exports.postAddBooking = (req, res, next) => {
  Booking.addBooking(req.body.id)
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((error) => {
      console.log("Error while adding booking:", error);
      res.redirect("/bookings");
    });
};

exports.postRemoveBooking = (req, res, next) => {
  Booking.removeBooking(req.body.id)
    .then(() => {
      res.redirect("/bookings");
    })
    .catch((error) => {
      console.log("Error while removing booking:", error);
      res.redirect("/bookings");
    });
};

exports.getHomeDetalis = (req, res, next) => {
  const homeID = req.params.homeID;
  Home.findById(homeID).then((home) => {
    if (!home) {
      console.log("Home Not Found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};
