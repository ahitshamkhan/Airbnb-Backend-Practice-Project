const express = require("express");
const authrouter = express.Router();

const authcontroller = require("../controllers/authcontroller" );

authrouter.get("/Login", authcontroller.getLogin);
authrouter.post("/Login", authcontroller.postLogin);
authrouter.get("/logout", authcontroller.getLogout);

module.exports = authrouter;
