const Favourite = require("../models/favourite");
const Home = require("../models/home");
const Booking = require("../models/booking");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    }),
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    }),
  );
};

exports.getBookings = (req, res, next) => {
  Booking.getBookings(bookings => {
    Home.fetchAll((registeredHomes) => {
      const bookedHomes = registeredHomes.filter(home => bookings.includes(home.id));
      res.render("store/bookings", {
        bookedHomes: bookedHomes,
        pageTitle: "My Bookings",
        currentPage: "bookings",
      });
    });
  });
};

exports.getFavouriteList = (req, res, next) => {
   Favourite.getFavourites(favourites => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })
};

exports.postAddtoFavourite = (req, res, next) => {
  console.log("Came to add to Favourite", req.body);
  Favourite.addToFavourite(req.body.id, error=>{
    if(error){
      console.log("Error while marking favourite");
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFavourite = (req, res, next) => {
  Favourite.removeFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while removing favourite");
    }
    res.redirect("/favourites");
  });
};

exports.postAddBooking = (req, res, next) => {
  Booking.addBooking(req.body.id, (error) => {
    if (error) {
      console.log("Error while adding booking");
    }
    res.redirect("/bookings");
  });
};

exports.postRemoveBooking = (req, res, next) => {
  Booking.removeBooking(req.body.id, (error) => {
    if (error) {
      console.log("Error while removing booking");
    }
    res.redirect("/bookings");
  });
};

exports.getHomeDetalis = (req, res, next) => {
  const homeID = req.params.homeID;
  Home.findByid(homeID, (home) => {
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
