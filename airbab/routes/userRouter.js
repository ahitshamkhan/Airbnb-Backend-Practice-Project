const express = require("express");
const userrouter = express.Router();

const homecontroller = require("../controllers/home");

userrouter.get("/", homecontroller.getHostHomes);

module.exports = userrouter;
