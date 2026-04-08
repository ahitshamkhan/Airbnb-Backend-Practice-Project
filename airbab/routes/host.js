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
  const houseName = typeof req.body.houseName === "string" ? req.body.houseName.trim() : "";
  if (!houseName) {
    return res.redirect("/host/add-home");
  }
  registerhomes.push({ houseName });

  return res.render("homeadded", { pageTitle: "Home Added" });
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
  const houseName = typeof req.body.houseName === "string" ? req.body.houseName.trim() : "";
  if (Number.isNaN(homeIndex) || homeIndex < 0 || homeIndex >= registerhomes.length) {
    return res.redirect("/");
  }
  if (!houseName) {
    return res.redirect(`/host/edit-home/${homeIndex}`);
  }
  registerhomes[homeIndex].houseName = houseName;
  return res.render("homeadded", { pageTitle: "Home Updated" });
});

exports.hostrouter = hostrouter;
exports.registerhomes = registerhomes;
