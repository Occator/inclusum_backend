const User = require("../schemas/User");
const jwt = require("jsonwebtoken");

const createToken = (_id, name) => {
  return jwt.sign({ _id, name }, process.env.SECRET, { expiresIn: "1d" });
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

module.exports = { loginUser, signupUser };
