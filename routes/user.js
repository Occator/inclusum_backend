const express = require("express");

const {
  loginUser,
  signupUser,
  updateUser,
  getOneUser,
  getAllUsers,
} = require("../controllers/user");

const app = express.Router();

app.post("/login", loginUser);
app.post("/signup", signupUser);
app.put("/updateuser", updateUser);
app.get("/getallusers", getAllUsers);

module.exports = app;
