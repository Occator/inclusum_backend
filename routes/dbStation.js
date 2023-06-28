const express = require("express");

const { getOneStation } = require("../controllers/dbStation");

const app = express.Router();

app.get("/:stationNumber", getOneStation);

module.exports = app;
