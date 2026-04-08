const express = require("express");
const path = require("path");

const hostrouter = express.Router();
const rootdir = require("../utlits/pathutlits");

hostrouter.get("/add-home", (req, res, next) => {
  res.render("addhome", {
    pageTitle: "Add Home",
    editing: false,
    editedHome: null,
    homeIndex: -1,
  });
});

const registerhomes = [];

hostrouter.post("/add-home", (req, res, next) => {
  console.log(req.body, req.body.houseName);
  registerhomes.push({ houseName: req.body.houseName });

  res.render("homeadded", { pageTitle: "Home Added" });
});

hostrouter.get("/edit-home/:homeId", (req, res, next) => {
  const homeIndex = Number(req.params.homeId);
  if (Number.isNaN(homeIndex) || homeIndex < 0 || homeIndex >= registerhomes.length) {
    return res.redirect("/");
  }
  return res.render("addhome", {
    pageTitle: "Edit Home",
    editing: true,
    editedHome: registerhomes[homeIndex],
    homeIndex,
  });
});

hostrouter.post("/edit-home", (req, res, next) => {
  const homeIndex = Number(req.body.homeIndex);
  if (!Number.isNaN(homeIndex) && homeIndex >= 0 && homeIndex < registerhomes.length) {
    registerhomes[homeIndex].houseName = req.body.houseName;
  }
  return res.render("homeadded", { pageTitle: "Home Updated" });
});

exports.hostrouter = hostrouter;
exports.registerhomes = registerhomes;
