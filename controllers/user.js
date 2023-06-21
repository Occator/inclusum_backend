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

//Get the picture

const getAvatar = async (req, res) => {
  try {
    const avatar = User.find();
    return res.status(200).json({avatar});
  } catch (error) {
    console.error(error);
    return res.status(500).json({error});
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (req.file && req.file.path) {
      const image = new Image({
        description: req.body.desc,
        url: req.file.path
      });
      await image.save()
      return res.status(200).json({msg: "image successfully saved"})
    } else {
      console.log(req.file);
      return res.status(422).json({error: "invalid format"})
    }
  } catch (error) {
    return res.status(500).json({error});
  }
}

const updateUser = async (req, res) => {
  try {
    const {_id, avatar, city} = req.body;
    const user = await User.findByIdAndUpdate(_id,
    {
      avatar,
      city
    },
    {
      new: true,
    }
  );

  if(!user) {
    res.status(404).json({msg: "Cannot find the user"})
  } else {
    res.status(200).json({msg: "User updated successfully", data: user})
  }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}

module.exports = { loginUser, signupUser, getAvatar, uploadAvatar, updateUser};
