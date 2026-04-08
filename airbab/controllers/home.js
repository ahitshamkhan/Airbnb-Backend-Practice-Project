const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addhome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    home: null,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeID = req.params.homeID;
  Home.findByid(homeID, (home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    res.render("host/addhome", {
      pageTitle: "Edit Home",
      currentPage: "addHome",
      editing: true,
      home: home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const homeID = req.body.homeID;
  const updatedData = {
    houseName: req.body.houseName,
    price: req.body.price,
    location: req.body.location,
    rating: req.body.rating,
    photoUrl: req.body.photoUrl,
  };
  Home.update(homeID, updatedData, (error) => {
    if (error) {
      console.log("Error updating home:", error);
    }
    res.redirect("/host/host-home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeID = req.body.homeID;
  Home.deleteById(homeID, (error) => {
    if (error) {
      console.log("Error deleting home:", error);
    }
    res.redirect("/host/host-home-list");
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    }),
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/homeadded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};
