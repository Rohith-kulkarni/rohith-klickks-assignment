const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "users.db");

const db = new sqlite3.Database(dbPath, (e) => {
  if (e) {
    console.log("DB connection error:", e.message);
  } else {
    console.log("DB connection successful");
    db.run(
      `CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT);`,
      (err) => {
        if (err) {
          console.log("Error creating users table:", err.message);
        } else {
          console.log("Table created");
        }
      }
    );
  }
});

module.exports = db;
