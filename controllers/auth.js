const { request, response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createJWT, verifyJWT } = require("../utils/jwt");
const {
  cookieOptions,
  genderImages,
  tokenName,
  serverMessage,
} = require("../utils/variables");
const { saveCloudImage } = require("../middlewares/cloudinary");
const { compressImg } = require("../utils/buffer");

// Login
const login = async (req = request, res = response) => {
  const { username, password } = req.body;
  if (!password || !username)
    return res.status(400).json("Must fill all fields");
  try {
    const user = await User.findOne({ username });
    if (!user) throw Error("Username incorrect");

    // Handle password
    const isPassMAtch = await bcrypt.compare(password, user.password);
    if (!isPassMAtch) throw Error("Password incorrect");

    // Handle JWT and cookies
    const token = createJWT({ id: user._id, username: user.username });
    res.cookie(tokenName, token, cookieOptions);

    // Sending the response
    const { password: psw, ...sendUser } = user._doc;
    sendUser.fullname = `${sendUser.firstname} ${sendUser.lastname}`;
    sendUser.profileImg = sendUser.profileImg.url;
    res.status(200).json(sendUser);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Login: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Register
const register = async (req, res) => {
  const file = req.file;
  const { password, ...body } = req.body;

  if (!password) return res.status(400).json("Must enter all fields");

  try {
    const foundUsername = await User.findOne({ username: body.username });
    if (foundUsername) throw Error("Username is found");

    // Handle Uploaded image
    if (file) {
      const handledFile = await compressImg(file.buffer);
      const result = await saveCloudImage(handledFile.toString("base64"));
      if (!result) throw Error("Error with uploading image");
      body.profileImg = {
        cloudinary_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      if (body.gender == "female")
        body.profileImg = { url: genderImages.female };
      else body.profileImg = { url: genderImages.male };
    }

    // Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const encyrptPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      ...body,
      password: encyrptPassword,
    });

    // Create JWT Token
    const token = createJWT({ id: user._id, username: user.username });
    res.cookie(tokenName, token, cookieOptions);

    // Sending the response
    const { password: psw, ...sendUser } = user._doc;
    sendUser.fullname = `${sendUser.firstname} ${sendUser.lastname}`;
    sendUser.profileImg = sendUser.profileImg.url;
    res.status(200).json(sendUser);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Register: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Logout
const logout = (req = request, res = response) => {
  res
    .clearCookie(tokenName, cookieOptions)
    .status(200)
    .json("Logged out successfull");
};

// Check login
const checkLogin = async (req = request, res = response) => {
  const token = req.cookies?.token;
  if (!token || token == "" || !Boolean(token))
    return res
      .clearCookie(tokenName, cookieOptions)
      .status(401)
      .json("User not logged in");
  console.log("Checklogin Cookies", token);
  try {
    const decoded = verifyJWT(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .clearCookie(tokenName, cookieOptions)
        .status(401)
        .json("No logged in user");
    }
    // Sending the response
    const { password, ...sendUser } = user._doc;
    sendUser.fullname = `${sendUser.firstname} ${sendUser.lastname}`;
    sendUser.profileImg = sendUser.profileImg.url;
    res.status(200).json(sendUser);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Checklogin: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  register,
  login,
  logout,
  checkLogin,
};
