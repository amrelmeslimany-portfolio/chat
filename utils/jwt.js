const jwt = require("jsonwebtoken");

module.exports = {
  createJWT: (user) => {
    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "10d" });
    return token;
  },
  verifyJWT: (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  },
};
