// Core Modules
const db = require("../utils/databaseutil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        `UPDATE Homes SET House_Name=?, Price=?, Location=?, Rating=?, PhotoURL=?, Home_description=? WHERE Home_ID=?`,
        [
          this.houseName,
          this.price,
          this.location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ],
      );
    }
    return db.execute(
      `INSERT INTO Homes(House_Name,Price,Location,Rating,PhotoURL,Home_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        this.houseName,
        this.price,
        this.location,
        this.rating,
        this.photoUrl,
        this.description,
      ],
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM Homes").then(([homes, fields]) => {
      const transformedHomes = homes.map((home) => ({
        id: home.Home_ID,
        houseName: home.House_Name,
        price: home.Price,
        location: home.Location,
        rating: home.Rating,
        photoUrl: home.PhotoURL,
        description: home.Home_description,
      }));
      return [transformedHomes, fields];
    });
  }

  static findByid(homeID) {
    return db
      .execute("SELECT * FROM Homes WHERE Home_ID=?", [homeID])
      .then(([homes, fields]) => {
        if (homes.length === 0) return [[], fields];
        const home = homes[0];
        const transformedHome = {
          id: home.Home_ID,
          houseName: home.House_Name,
          price: home.Price,
          location: home.Location,
          rating: home.Rating,
          photoUrl: home.PhotoURL,
          description: home.Home_description,
        };
        return [[transformedHome], fields];
      });
  }
  static deleteById(homeID) {
    return db.execute("DELETE FROM Homes WHERE Home_ID=?", [homeID]);
  }

  static update(homeID, updatedData) {
    return db.execute(
      `UPDATE Homes SET House_Name=?, Price=?, Location=?, Rating=?, PhotoURL=?, Home_description=? WHERE Home_ID=?`,
      [
        updatedData.houseName,
        updatedData.price,
        updatedData.location,
        updatedData.rating,
        updatedData.photoUrl,
        updatedData.description,
        homeID,
      ],
    );
  }
};
