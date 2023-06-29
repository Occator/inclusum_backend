const mongoose = require("mongoose");

const userPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("userPost", userPostSchema);
