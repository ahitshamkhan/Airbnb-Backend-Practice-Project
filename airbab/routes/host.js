const express = require("express");
const path = require("path");

const hostrouter = express.Router();
const rootdir=require('../utlits/pathutlits');

hostrouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootdir, "views", "addhome.html"));
});

hostrouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir, "views", "homeadded.html"));
});

module.exports = hostrouter;
