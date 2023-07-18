const express = require("express");

const {
  loginUser,
  signupUser,
  updateUser,
  getOneUser,
  getAllUsers,
  verifyUser,
} = require("../controllers/user");

const app = express.Router();

app.post("/login", loginUser);
app.post("/signup", signupUser);
app.put("/updateuser", updateUser);
app.get("/getallusers", getAllUsers);
app.get("/:_id", getOneUser);
app.get("/:_id/verify/:token", verifyUser);

module.exports = app;
