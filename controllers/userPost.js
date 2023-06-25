const userPost = require("../schemas/UserPost");

const getAllUserPosts = async (req, res) => {
  try {
    const user_id = req.user._id;
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
  const { title, text, timestamp} = req.body;
  const user_id = req.user._id;
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
      if (req.file && req.file.path) {
        try {
          const post = new userPost({
            imageURL: req.file.path,
            user_id: user_id,
            title: title,
            text: text,
            timestamp: timestamp, 
          });
          await post.save();
          return res.status(200).json({ msg: "post successfully created",  data: post});
        } catch (error) {
          return res.status(500).json({ error });
        }
      } else {
        try {
          const post = await userPost.create({ title, text, user_id, timestamp});
          res.status(200).json({ msg: "post successfully created", data: post});
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
};

module.exports = { getAllUserPosts, createUserPost };
