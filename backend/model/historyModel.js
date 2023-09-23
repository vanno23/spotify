const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  itemId: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    enum: ["artist", "album", "playlist", "track"],
    required: true,
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

const historyData = mongoose.model("historyData", historySchema);

module.exports = historyData;
