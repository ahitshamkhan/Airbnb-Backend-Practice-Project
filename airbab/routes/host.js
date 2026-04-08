const express = require("express");
const hostrouter = express.Router();

const homecontroller = require("../controllers/home");

hostrouter.get("/add-home", homecontroller.getAddHome);

hostrouter.post("/add-home", homecontroller.postAddHome);

hostrouter.get("/edit-home/:homeID", homecontroller.getEditHome);
hostrouter.post("/edit-home", homecontroller.postEditHome);

hostrouter.post("/delete-home", homecontroller.postDeleteHome);

hostrouter.get("/host-home-list", homecontroller.getHostHomes);

exports.hostrouter = hostrouter;
