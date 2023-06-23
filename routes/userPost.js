const express = require("express");
const upload = require('../services/upload');

const {
  getAllUserPosts,
  createUserPost,
} = require("../controllers/userPost");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();
app.use(requireAuth);
app.get('/', getAllUserPosts)
app.post('/', upload.single("image"), createUserPost);

module.exports = app;
