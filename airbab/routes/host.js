const express = require("express");
const hostrouter = express.Router();

const homecontroller = require("../controllers/hostController");
const { isHost } = require("../middleware/auth");

hostrouter.get("/add-home", isHost, homecontroller.getAddHome);
hostrouter.post("/add-home", isHost, homecontroller.postAddHome);

hostrouter.get("/edit-home/:homeID", isHost, homecontroller.getEditHome);
hostrouter.post("/edit-home", isHost, homecontroller.postEditHome);

hostrouter.post("/delete-home", isHost, homecontroller.postDeleteHome);

hostrouter.get("/host-home-list", isHost, homecontroller.getHostHomes);

exports.hostrouter = hostrouter;
