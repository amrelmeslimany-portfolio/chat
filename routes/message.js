const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middlewares/protectRoutes");
const { sendMessage, removeMessage } = require("../controllers/message");

// Protect these routes
router.use(protectedRoute);

router.post("/:conversationID", sendMessage);

router.delete("/delete", removeMessage);

module.exports = router;
