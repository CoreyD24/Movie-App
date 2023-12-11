const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const port = 3000;

app.use(morgan("dev"));

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "client/dist")));

// Check for tokens
app.use((req, res, next) => {
  //Check the headers for an authorization token
  const auth = req.headers.authorization;
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  try {
    req.user = jwt.verify(token, process.env.SECRET);
  } catch {
    req.user = null;
  }

  //Log the current user
  console.log("USER: ", req.user);

  next();
});

//

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

app.get("/", (req, res) => {
  //TODO: Serve static html file
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
