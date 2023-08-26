const User = require("../models/User");
const { verifyJWT } = require("../utils/jwt");
const { serverMessage } = require("../utils/variables");

const protectedRoute = async (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token) return res.status(401).json("You must login");
  try {
    const decoded = verifyJWT(token);
    const user = await User.findById(decoded.id);
    if (!user) throw Error("User not found");
    req.user = user;
    next();
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Protect Route: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  protectedRoute,
};
