const express = require("express");
const authrouter = express.Router();

const authcontroller = require("../controllers/authcontroller" );

authrouter.get("/signup", authcontroller.getSignup);
authrouter.post("/signup", authcontroller.postSignup);

authrouter.get("/Login", authcontroller.getLogin);
authrouter.post("/Login", authcontroller.postLogin);
authrouter.get("/logout", authcontroller.getLogout);

module.exports = authrouter;
