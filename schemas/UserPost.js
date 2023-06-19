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
  image: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userPost", userPostSchema);
