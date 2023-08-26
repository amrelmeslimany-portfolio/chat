const express = require("express");
const router = express.Router();
const {
  getAll,
  getDetails,
  deleteConversation,
  editConversation,
  startConversation,
} = require("../controllers/conversation");
const { protectedRoute } = require("../middlewares/protectRoutes");

// Protect these routes
router.use(protectedRoute);

router.get("/", getAll);

router.post("/start", startConversation);

router.get("/:conversationID", getDetails);

router.patch("/:conversationID/edit", editConversation);

router.delete("/:conversationID", deleteConversation);

module.exports = router;
