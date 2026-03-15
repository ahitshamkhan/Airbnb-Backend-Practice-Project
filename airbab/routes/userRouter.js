const path = require("path");
const express = require("express");

const userrouter = express.Router();

const { registerhomes } = require("./host");

userrouter.get("/", (req, res, next) => {
  console.log(registerhomes);
  res.render("home", { registeredHomes: registerhomes, pageTitle: "Home" });
});

module.exports = userrouter;
