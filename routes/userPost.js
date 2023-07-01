const express = require("express");
const upload = require("../services/upload");

const {
  getAllUserPosts,
  createUserPost,
  getAllCityPosts,
  deleteSingleUserPost,
} = require("../controllers/userPost");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();
app.use(requireAuth);
app.get("/", getAllUserPosts).get("/:city", getAllCityPosts);
app.post("/", upload.single("image"), createUserPost);
app.delete("/:_id", deleteSingleUserPost);

module.exports = app;
