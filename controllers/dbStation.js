const dbStation = require("../schemas/DBStation");

// get single train station name
const getOneStation = async (req, res) => {
  try {
    const { stationNumber } = req.params;
    const station = await dbStation.findOne({ stationNumber });
    console.log("station", station);
    if (!station) {
      res.status(400).json({ error: station });
    } else {
      res.status(200).json({ data: station });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get all train stations
const getAllTrainStations = async (req, res) => {
  try {
    const trainStations = await dbStation.find();
    if (!trainStations.length) {
      res.status(200).json({ msg: "No train stations in MongoDB" });
    } else {
      res.status(200).json({ data: trainStations });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getOneStation, getAllTrainStations };
