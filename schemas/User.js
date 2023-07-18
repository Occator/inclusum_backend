const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  points: {
    type: Number,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

//creating custom static signup method

userSchema.statics.signup = async function (
  email,
  password,
  username,
  city,
  avatar,
  points,
  verified
) {
  //check if user already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use, please provide different one.");
  }
  //make sure user filled in email and password and username
  if (!email || !password || !username || !city) {
    throw Error("Please fill in all fields.");
  }
  //validate email
  if (!validator.isEmail(email)) {
    throw Error("Wrong format, please check your email address.");
  }
  //validate password
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case, one lower, one number and one symbol"
    );
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user in DB
  const user = await this.create({
    email,
    password: hash,
    username,
    city,
    avatar,
    points,
    verified,
  });

  return user;
};

//creating custom static login method
userSchema.statics.login = async function (email, password) {
  //checking for both
  if (!email || !password) {
    throw Error("Please fill all fields");
  }

  const user = await this.findOne({ email });
  // check that email is correct
  if (!user) {
    throw Error("Incorrect email");
  }
  // check the password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
