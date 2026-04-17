// Core Modules
const db = require("../utils/databaseutil");

module.exports = class Favourite {
  static addToFavourite(homeId) {
    return new Promise((resolve, reject) => {
      // Check if already favourited
      db.execute("SELECT * FROM Favourites WHERE Home_ID = ?", [homeId])
        .then(([rows]) => {
          if (rows.length > 0) {
            reject("Home is already marked favourite");
          } else {
            // Add to favourites
            return db.execute("INSERT INTO Favourites(Home_ID) VALUES (?)", [
              homeId,
            ]);
          }
        })
        .then(() => resolve())
        .catch(reject);
    });
  }

  static getFavourites() {
    return db.execute("SELECT Home_ID FROM Favourites").then(([rows]) => {
      // Convert [{Home_ID: 1}, {Home_ID: 2}] to [1, 2]
      return rows.map((row) => row.Home_ID);
    });
  }

  static removeFavourite(homeId) {
    return db.execute("DELETE FROM Favourites WHERE Home_ID = ?", [homeId]);
  }
};
