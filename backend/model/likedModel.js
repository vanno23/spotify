const mongoose = require("mongoose");

const likedItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const LikedItem = mongoose.model("LikedItem", likedItemSchema);

module.exports = LikedItem;
