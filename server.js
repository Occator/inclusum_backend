const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 8080;

connectDB();

// middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Inclusum API");
});

app.listen(PORT, () => {
  console.log(`server connected on ${PORT}`);
});
