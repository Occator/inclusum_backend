const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const Token = require("../schemas/Token");
const sendEmail = require("../services/sendEmail");
const crypto = require("crypto");

const createToken = (_id, name) => {
  return jwt.sign({ _id, name }, process.env.SECRET, { expiresIn: "1d" });
};

const getOneUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id).select(
      "avatar city email points username _id"
    );
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
  const { email, password, username, city, avatar, points, verified } =
    req.body;
  try {
    const user = await User.signup(
      email,
      password,
      username,
      city,
      avatar,
      points,
      verified
    );

    // res.status(200).json({ email, token });
    const verificationToken = await new Token({
      user_id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const verificationURL = `http://localhost:3000/user/${user._id}/verify/${verificationToken.token}`;
    sendEmail(user.email, "Verify Email", verificationURL);
    if (verificationToken && token) {
      res.status(201).json({
        token,
        msg: "An Email has been sent to your account, please verify.",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//users email verification
const verifyUser = async (req, res) => {
  const token = createToken(user._id, user.username);
  const { _id, verifytoken } = req.params;
  try {
    const user = await User.findById(_id);
    console.log("user_id", user._id);
    if (!user) {
      return res.status(400).send({ msg: "Invalid link." });
    }
    const verificationToken = await Token.findOne({
      user_id: user._id,
      token: verifytoken,
    });
    console.log("verificationToken", verificationToken);
    if (!verificationToken) {
      return res.status(400).send({ msg: "invalid link" });
    }
    await User.findByIdAndUpdate(_id, { verified: true }, { new: true });
    await verificationToken.deleteOne({ token: verifytoken });
    res.status(200).send({ msg: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
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

module.exports = {
  loginUser,
  signupUser,
  updateUser,
  getOneUser,
  getAllUsers,
  verifyUser,
};
