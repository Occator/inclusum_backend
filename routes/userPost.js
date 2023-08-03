const express = require("express");
const upload = require("../services/upload");

const {
  getAllUserPosts,
  createUserPost,
  getAllCityPosts,
  deleteSingleUserPost,
  addLike,
  addDislike,
  deleteLike,
  deleteDislike,
} = require("../controllers/userPost");
const requireAuth = require("../middlewares/requireAuth");

const app = express.Router();
app.use(requireAuth);
app.get("/", getAllUserPosts).get("/:city", getAllCityPosts);
app.post("/", upload.single("image"), createUserPost);
app.delete("/:_id", deleteSingleUserPost);
app.put("/likes/add/:_id", addLike);
app.put("/dislikes/add/:_id", addDislike);
app.put("/likes/delete/:_id", deleteLike);
app.put("/dislikes/delete/:_id", deleteDislike);

module.exports = app;
