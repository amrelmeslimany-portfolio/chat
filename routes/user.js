const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  getUsers,
  getDetails,
  edit,
  editPassword,
  getMostChats,
  blockUser,
  getBlockList,
} = require("../controllers/user");
const { protectedRoute } = require("../middlewares/protectRoutes");

// Protect these routes
router.use(protectedRoute);

router.get("/", getUsers);

router.get("/chats/most", getMostChats);

router.get("/block", getBlockList);

router.get("/:userId", getDetails);

router.patch("/block/:userId", blockUser);

router.patch("/edit", upload.single("image"), edit);

router.patch("/password/change", editPassword);

module.exports = router;
