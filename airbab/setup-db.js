const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "8787",
  database: "airbnb",
});

const promisePool = pool.promise();

async function setupDatabase() {
  try {
    // Create Favourites table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS Favourites (
        Favourite_ID INT PRIMARY KEY AUTO_INCREMENT,
        Home_ID INT NOT NULL,
        FOREIGN KEY (Home_ID) REFERENCES Homes(Home_ID) ON DELETE CASCADE
      )
    `);
    console.log("✓ Favourites table created");

    // Create Bookings table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS Bookings (
        Booking_ID INT PRIMARY KEY AUTO_INCREMENT,
        Home_ID INT NOT NULL,
        Booking_Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (Home_ID) REFERENCES Homes(Home_ID) ON DELETE CASCADE
      )
    `);
    console.log("✓ Bookings table created");

    console.log("✓ Database setup completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("✗ Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();
 