const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const MONGO_URL = "mongodb://localhost:27017";

let _db;

const mongoConnect = (callback) => {
  mongoClient
    .connect(MONGO_URL)
    .then((client) => {
      _db = client.db("Airbnb");
      callback();
    })
    .catch((err) => {
      console.log("Error while connecting to Mongo: ", err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
