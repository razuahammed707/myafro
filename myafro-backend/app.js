const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config("../myafro-backend");
require("./src/config/database");

const routers = require("./src/routers");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow access from anywhere
app.use(
  cors({
    origin: "*",
  })
);

//base endpoint
app.use("/api/myafro", routers);

app.use((req, res, next) => next(createError(404)));

//default error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: false,
    message: err.message,
  });
});

module.exports = app
