const express = require("express");
const path = require("path");

const hostrouter = express.Router();
const rootdir = require("../utlits/pathutlits");

hostrouter.get("/add-home", (req, res, next) => {
  res.render("addhome", { pageTitle: "Add Home" });
});

const registerhomes = [];

hostrouter.post("/add-home", (req, res, next) => {
  console.log(req.body, req.body.houseName);
  registerhomes.push({ houseName: req.body.houseName });

  res.render("homeadded", { pageTitle: "Home Added" });
});

exports.hostrouter = hostrouter;
exports.registerhomes = registerhomes;
