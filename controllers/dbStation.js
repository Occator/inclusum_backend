const dbStation = require("../schemas/DBStation");

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

module.exports = { getOneStation };
