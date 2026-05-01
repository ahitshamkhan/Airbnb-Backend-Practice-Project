// ── Load environment variables FIRST (before anything else) ─────────────────
require("dotenv").config();

const path        = require("path");
const express     = require("express");
const session     = require("express-session");
const mongoose    = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);

// ── Routers ──────────────────────────────────────────────────────────────────
const userrouter      = require("./routes/storeRouter");
const { hostrouter }  = require("./routes/host");
const authrouter      = require("./routes/authRouter");

// ── Utilities & Controllers ───────────────────────────────────────────────────
const rootdir         = require("./utils/pathUtils");
const ErrorController = require("./controllers/error");

// ── Environment Variables ─────────────────────────────────────────────────────
const MONGO_URI      = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT           = process.env.PORT || 3000;

// ── Validate required env vars ────────────────────────────────────────────────
if (!MONGO_URI || !SESSION_SECRET) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}

// ── App Init ─────────────────────────────────────────────────────────────────
const app = express();

// ── View Engine ───────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", "views");

// ── Session Store (MongoDB) ───────────────────────────────────────────────────
const store = new MongoDBStore({
  uri:        MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => {
  console.error("❌ Session Store Error:", err);
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret:            SESSION_SECRET,
    resave:            false,
    saveUninitialized: false,
    store:             store,
    cookie: {
      // In production use HTTPS only cookies
      secure:   process.env.NODE_ENV === "production",
      httpOnly: true,           // prevent JS access to cookie
      maxAge:   1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ── Pass auth state to every EJS template ─────────────────────────────────────
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

// ── Static Files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(rootdir, "public")));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use(userrouter);
app.use(authrouter);
app.use("/host", hostrouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use(ErrorController.pageNotFound);

// ── Database + Server Start ───────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running → http://localhost:${PORT}  [${process.env.NODE_ENV || "development"}]`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
