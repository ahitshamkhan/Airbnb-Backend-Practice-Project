// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utlits/pathutlits");
 const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    this.id=Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
  
  static findByid(homeID,callback){
    this.fetchAll(homes=>{
      const HomeFound=homes.find(homes=>homes.id===homeID);
      callback(HomeFound);
    });
  }

  static deleteById(homeID, callback) {
    this.fetchAll(homes => {
      const updatedHomes = homes.filter(home => home.id !== homeID);
      fs.writeFile(homeDataPath, JSON.stringify(updatedHomes), (error) => {
        callback(error);
      });
    });
  }

  static update(homeID, updatedData, callback) {
    this.fetchAll(homes => {
      const homeIndex = homes.findIndex(home => home.id === homeID);
      if (homeIndex !== -1) {
        homes[homeIndex] = { ...homes[homeIndex], ...updatedData };
      }
      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        callback(error);
      });
    });
  }

};
