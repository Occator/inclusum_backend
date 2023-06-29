const express = require("express");

const {
  getOneStation,
  getAllTrainStations,
} = require("../controllers/dbStation");

const app = express.Router();
app
  .get("/alltrainstations", getAllTrainStations)
  .get("/:stationNumber", getOneStation);

module.exports = app;
