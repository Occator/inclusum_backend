const express = require("express");
const upload = require('../services/upload');

const { loginUser, signupUser, getAvatar, uploadAvatar, updateUser} = require("../controllers/user");

const app = express.Router();

app.post("/login", loginUser);
app.post("/signup", signupUser);
app.post("/avatar", upload.single("picture"), uploadAvatar)
app.get("/getavatar", getAvatar)
app.put("/updateuser", updateUser)

module.exports = app;
