const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { register, login, logout, checkLogin } = require("../controllers/auth");

router.post("/login", login);

router.post("/register", upload.single("image"), register);

router.get("/logout", logout);

router.get("/checklogin", checkLogin);

module.exports = router;
