const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You are not authorized" });
  }
  //the auth in the headers is structured as a string and we only need the second part -> Bearer Authorization
  const token = authorization?.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id city");
    next();
  } catch (error) {
    res.status(401).json({ error: "You are not supposed to be here." });
  }
};

module.exports = requireAuth;
