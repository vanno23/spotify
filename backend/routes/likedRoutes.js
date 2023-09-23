const express = require("express");
const { likedItems, getLikedItems } = require("../controllers/likedController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getLikedItems);
router.post("/", protect, likedItems);

module.exports = router;
