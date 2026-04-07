const express = require("express");
const storrouter = express.Router();

const storecontroller = require("../controllers/storecontroller");

storrouter.get("/", storecontroller.getIndex);
storrouter.get("/homes", storecontroller.getHomes);
storrouter.get("/favourites", storecontroller.getFavouriteList);
storrouter.get("/bookings", storecontroller.getBookings);
storrouter.get("/homes/:homeID", storecontroller.getHomeDetalis);
storrouter.post("/favourites",storecontroller.postAddtoFavourite);

module.exports = storrouter;
