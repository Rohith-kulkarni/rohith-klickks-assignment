const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");
const cookieParser = require("cookie-parser");
const userAuth = require("./routes/auth");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 },
  })
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, user) => {
      if (err) {
        res.status(500).send(`Internal server error`, err.message);
      } else if (user === undefined) {
        res.status(404).send(`User with username '${username}' Not Found`);
      } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          res.status(401).send(err);
        } else {
          req.session.userId = user.id;
          res.status(200).send(user);
        }
      }
    }
  );
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  try {
    await db.run(`INSERT INTO users(username, password) values(?,?)`, [
      username,
      hashedPw,
    ]);
    res.status(200);
    res.send("User successfully registered");
  } catch (e) {
    res.status(500);
    res.send(`Registration error:`, e.message);
  }
});

app.get("/all", userAuth, async (req, res) => {
  db.all("SELECT * FROM users", [], (err, users) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200);
      res.send(users);
    }
  });
});

app.get("/", userAuth, async (req, res) => {
  res.send("Hurray, you have logged in");
});

app.listen(3000, () => {
  console.log(`App is now listening to port:3000`);
});
