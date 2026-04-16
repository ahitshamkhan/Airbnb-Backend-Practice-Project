// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId) {
    return new Promise((resolve, reject) => {
      Favourite.getFavourites()
        .then((favourites) => {
          if (favourites.includes(homeId)) {
            reject("Home is already marked favourite");
          } else {
            favourites.push(homeId);
            fs.writeFile(
              favouriteDataPath,
              JSON.stringify(favourites),
              (err) => {
                if (err) reject(err);
                else resolve();
              },
            );
          }
        })
        .catch(reject);
    });
  }

  static getFavourites() {
    return new Promise((resolve, reject) => {
      fs.readFile(favouriteDataPath, (err, data) => {
        if (err) resolve([]);
        else resolve(JSON.parse(data));
      });
    });
  }

  static removeFavourite(homeId) {
    return new Promise((resolve, reject) => {
      Favourite.getFavourites()
        .then((favourites) => {
          const updatedFavourites = favourites.filter((id) => id !== homeId);
          fs.writeFile(
            favouriteDataPath,
            JSON.stringify(updatedFavourites),
            (err) => {
              if (err) reject(err);
              else resolve();
            },
          );
        })
        .catch(reject);
    });
  }
};
