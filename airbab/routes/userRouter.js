const path=require('path');
const express = require("express");

const userrouter = express.Router();
const rootdir=require('../utlits/pathutlits');

userrouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootdir,'views','home.html'));
});

module.exports = userrouter;
