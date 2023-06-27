const dbStation = require("../schemas/DBStation");

// create new single DB API-Post

const createDBStation = async (req, res) => {
  try {
    const { stationName, stationNumber, description, geocoordX, geocoordY } =
      req.body;
    const station = await dbStation.create({
      stationName,
      stationNumber,
      description,
      geocoordX,
      geocoordY,
    });
    res.status(201).json({ data: station });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// get single train station name
const getOneStation = async (req, res) => {
  console.log("req.params", req.params);
  try {
    // not sure what is better to use stationName or stationNumber
    const { stationNumber } = req.params;
    const station = await dbStation.findOne({ stationNumber });
    if (!station) {
      res.status(400).json({ error: station });
    } else {
      res.status(200).json({ data: station });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createDBStation, getOneStation };
