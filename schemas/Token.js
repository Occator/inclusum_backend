const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: "1h",
  },
});

module.exports = mongoose.model("token", tokenSchema);
