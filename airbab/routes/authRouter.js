const express = require("express");
const authrouter = express.Router();

const authcontroller = require("../controllers/authcontroller" );

authrouter.get("/Login", authcontroller.getLogin);

module.exports = authrouter;
