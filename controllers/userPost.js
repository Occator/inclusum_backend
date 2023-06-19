const { json } = require("express");
const userPost = require("../schemas/UserPost");

const getAllUserPosts = async (req, res) => {
  try {
    const user_id = req.user_id;
    const posts = await userPost.find({ user_id });
    if (!posts.length) {
      return res.this.status(200).json({ msg: "no posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserPost = async (req, res) => {
  const { title, text } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  try {
    const user_id = req.user_id;
    const post = await userPost.create({ title, text, user_id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// to create a user post with an image
const createUserPostWithImg = async (req, res) => {
  const { title, text, image } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (!image) {
    emptyFields.push("no image to display");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  try {
    const user_id = req.user_id;
    const post = await userPost.create({ title, text, user_id, image });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUserPosts, createUserPost, createUserPostWithImg };
