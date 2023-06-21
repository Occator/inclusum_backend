const express = require("express");

const { loginUser, signupUser, updateUser} = require("../controllers/user");

const app = express.Router();

app.post("/login", loginUser);
app.post("/signup", signupUser);
app.put("/updateuser", updateUser);

module.exports = app;
