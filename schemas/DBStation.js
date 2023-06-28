const mongoose = require("mongoose");

const dbStationSchema = new mongoose.Schema({
  stationName: {
    type: String,
  },
  stationNumber: {
    type: Number,
  },
  geocoordX: {
    type: Number,
  },
  geocoordY: {
    type: Number,
  },
});

module.exports = mongoose.model("DBStation", dbStationSchema);
