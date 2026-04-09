const express = require("express");
const storrouter = express.Router();

const storecontroller = require("../controllers/storeController");

storrouter.get("/", storecontroller.getIndex);
storrouter.get("/homes", storecontroller.getHomes);
storrouter.get("/favourites", storecontroller.getFavouriteList);
storrouter.get("/bookings", storecontroller.getBookings);
storrouter.get("/homes/:homeID", storecontroller.getHomeDetalis);
storrouter.post("/favourites", storecontroller.postAddtoFavourite);
storrouter.post("/favourites/remove", storecontroller.postRemoveFavourite);
storrouter.post("/bookings/add", storecontroller.postAddBooking);
storrouter.post("/bookings/remove", storecontroller.postRemoveBooking);

module.exports = storrouter;
