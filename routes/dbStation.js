const express = require("express");

const { createDBStation, getOneStation } = require("../controllers/dbStation");

const app = express.Router();

app.post("/postdbstation", createDBStation);
app.get("/:stationNumber", getOneStation);

module.exports = app;
