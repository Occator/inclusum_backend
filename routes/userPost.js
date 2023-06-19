const express = require("express");
const {
  getAllUserPosts,
  createUserPost,
  createUserPostWithImg,
} = require("../controllers/userPost");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();
app.use(requireAuth);
app.route("/").get(getAllUserPosts).post(createUserPost); // check if chaining to post methods

module.exports = app;
