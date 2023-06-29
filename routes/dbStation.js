const express = require("express");

const {
  getOneStation,
  getAllTrainStations,
} = require("../controllers/dbStation");

const app = express.Router();

app.get("/:stationNumber", getOneStation);
app.get("/allTrainStations", getAllTrainStations);

module.exports = app;
