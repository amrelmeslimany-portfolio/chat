const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middlewares/protectRoutes");
const { search } = require("../controllers/shared");

// Protect these routes
router.use(protectedRoute);

router.get("/search", search);

module.exports = router;
