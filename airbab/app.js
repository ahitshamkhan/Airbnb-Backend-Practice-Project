const path = require("path");
const express = require("express");
const userrouter = require("./routes/userRouter");
const hostrouter = require("./routes/host");
const rootdir=require('./utlits/pathutlits');



const app = express();

app.use(express.urlencoded());

app.use(userrouter);

app.use("/host", hostrouter);

app.use(express.static(path.join(rootdir, "public")));

app.use((req, res, next) => {
  res.sendFile(path.join(rootdir, "views", "404.html"));
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
