const express = require("express");
const storrouter = express.Router();

const storecontroller = require("../controllers/storeController");
const { isLoggedIn, isGuest } = require("../middleware/auth");

storrouter.get("/", storecontroller.getIndex);
storrouter.get("/homes", storecontroller.getHomes);
storrouter.get("/homes/:homeID", storecontroller.getHomeDetalis);

storrouter.get("/favourites", isGuest, storecontroller.getFavouriteList);
storrouter.post("/favourites", isGuest, storecontroller.postAddtoFavourite);
storrouter.post("/favourites/remove", isGuest, storecontroller.postRemoveFavourite);

storrouter.get("/bookings", isGuest, storecontroller.getBookings);
storrouter.post("/bookings/add", isGuest, storecontroller.postAddBooking);
storrouter.post("/bookings/remove", isGuest, storecontroller.postRemoveBooking);

module.exports = storrouter;
