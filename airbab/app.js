const path = require("path");
const express = require("express");
const userrouter = require("./routes/userRouter");
const { hostrouter } = require("./routes/host");
const rootdir = require("./utils/pathUtils");
const ErrorController = require("./controllers/error");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

app.use(userrouter);

app.use("/host", hostrouter);

app.use(express.static(path.join(rootdir, "public")));

app.use(ErrorController.pageNotFound);

const PORT = 3000;
const DB_Path = "mongodb://akhano_db_user:1515@ac-luxmqei-shard-00-00.1pqgdir.mongodb.net:27017,ac-luxmqei-shard-00-01.1pqgdir.mongodb.net:27017,ac-luxmqei-shard-00-02.1pqgdir.mongodb.net:27017/Airbnb?authSource=admin&tls=true";
mongoose.connect(DB_Path)
.then(()=>{
  console.log("Mongo DB Connected")
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
.catch(err=>{console.log(" Mongo DB Connection Error: ",err)});

