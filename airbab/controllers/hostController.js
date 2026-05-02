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
  Home.findById(homeID)
    .then((home) => {
      if (!home) {
        return res.redirect("/host/host-home-list");
      }
      res.render("host/addhome", {
        pageTitle: "Edit Home",
        currentPage: "addHome",
        editing: true,
        home: home,
      });
    })
    .catch((err) => {
      console.log("Error fetching home:", err);
      res.redirect("/host/host-home-list");
    });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  Home.findByIdAndUpdate(
    id,
    { houseName, price, location, rating, photoUrl, description },
    { new: true }
  )
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error updating home:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeID = req.body.homeID;
  Home.findByIdAndDelete(homeID)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error deleting home:", error);
      res.redirect("/host/host-home-list");
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    }),
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    {houseName,
    price,
    location,
    rating,
    photoUrl,
    description}
  );
  home
    .save()
    .then(() => {
      console.log("Home Saved Successfully");
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error adding home:", error);
      res.redirect("/host/add-home");
    });
};
