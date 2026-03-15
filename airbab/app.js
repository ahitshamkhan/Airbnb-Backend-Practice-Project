const path = require("path");
const express = require("express");
const userrouter = require("./routes/userRouter");
const { hostrouter } = require("./routes/host");
const rootdir = require("./utlits/pathutlits");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(userrouter);

app.use("/host", hostrouter);

app.use(express.static(path.join(rootdir, "public")));

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Page Not Found" });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
