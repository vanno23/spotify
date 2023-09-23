const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  addHistory,
  getHistoryItems,
  deleteHistory,
} = require("../controllers/historyController");
const router = express.Router();

router.post("/", protect, addHistory);
router.get("/getData", protect, getHistoryItems);
router.post("/delete", protect, deleteHistory);

module.exports = router;
