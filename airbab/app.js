require("dotenv").config();

const path         = require("path");
const express      = require("express");
const session      = require("express-session");
const mongoose     = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

const userrouter      = require("./routes/storeRouter");
const { hostrouter }  = require("./routes/host");
const authrouter      = require("./routes/authRouter");

const rootdir         = require("./utils/pathUtils");
const ErrorController = require("./controllers/error");

const MONGO_URI      = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT           = process.env.PORT || 3000;

if (!MONGO_URI || !SESSION_SECRET) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri:        MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => {
  console.error("Session Store Error:", err);
});

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret:            SESSION_SECRET,
    resave:            false,
    saveUninitialized: false,
    store:             store,
    cookie: {
      secure:   process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge:   1000 * 60 * 60 * 24,
    },
  })
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use(express.static(path.join(rootdir, "public")));

app.use(userrouter);
app.use(authrouter);
app.use("/host", hostrouter);

app.use(ErrorController.pageNotFound);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT} [${process.env.NODE_ENV || "development"}]`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
