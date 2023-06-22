const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

const createToken = (_id, name) => {
  return jwt.sign({ _id, name }, process.env.SECRET, { expiresIn: "1d" });
};

const getOneUser = async (req, res) => {
  console.log(req.params);
  try {
    const { _id } = req.params;
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ data: user });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

//getAllUser
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      res.status(200).json({ msg: "No users in DB" });
    } else {
      res.status(200).json({ data: users });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
//user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//user sign up

const signupUser = async (req, res) => {
  const { email, password, username, city, avatar, points } = req.body;
  try {
    const user = await User.signup(
      email,
      password,
      username,
      city,
      avatar,
      points
    );
    const token = createToken(user._id, user.username);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, avatar, city } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      {
        avatar,
        city,
      },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(404).json({ msg: "Cannot find the user" });
    } else {
      res.status(200).json({ msg: "User updated successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = { loginUser, signupUser, updateUser, getOneUser, getAllUsers };
