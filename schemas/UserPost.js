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
  avatar: {
    type: String,
  },
  username: {
    type: String,
  },
  likes: {
    type: Number,
  },
  dislikes: {
    type: Number,
  },
});

module.exports = mongoose.model("userPost", userPostSchema);
