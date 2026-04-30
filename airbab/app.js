const path = require("path");
const express = require("express");
const session = require("express-session");
const userrouter = require("./routes/storeRouter");
const { hostrouter } = require("./routes/host");
const authrouter = require("./routes/authRouter");
const rootdir = require("./utils/pathUtils");
const ErrorController = require("./controllers/error");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_Path = "mongodb://localhost:27017/Airbab";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_Path,
  collection: "sessions",
});

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my-airbnb-secret-key",
    resave: false,
    saveUninitialized: false,
    store:store
  }),
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

mongoose
  .connect(DB_Path)
  .then(() => {
    console.log("Mongo DB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(" Mongo DB Connection Error: ", err);
  });
