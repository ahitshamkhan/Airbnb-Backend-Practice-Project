const path = require("path");
const express = require("express");
const session = require("express-session");
const userrouter = require("./routes/storeRouter");
const { hostrouter } = require("./routes/host");
const authrouter = require("./routes/authRouter");
const rootdir = require("./utils/pathUtils");
const ErrorController = require("./controllers/error");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my-airbnb-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Make isLoggedIn available to all views
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use(userrouter);
app.use(authrouter);

app.use("/host", hostrouter);

app.use(express.static(path.join(rootdir, "public")));

app.use(ErrorController.pageNotFound);

const PORT = 3000;
const DB_Path = "mongodb://localhost:27017/Airbab";
mongoose.connect(DB_Path)
.then(()=>{
  console.log("Mongo DB Connected")
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
.catch(err=>{console.log(" Mongo DB Connection Error: ",err)});

