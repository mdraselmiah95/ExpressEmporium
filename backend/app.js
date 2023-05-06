const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(bodyParser.urlencoded({ extended: true }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Route Imports
const user = require("./routes/user.route");

app.use("/api/v2/user", user);

// Middleware for Errors Handling
app.use(ErrorHandler);

module.exports = app;
