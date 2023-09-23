const express = require("express");
const LikedItem = require("../model/likedModel");
const mongoose = require("mongoose");

// Route to handle the "like" action
const getLikedItems = async (req, res) => {
  const likedItems = await LikedItem.find({ userId: req.user.id });

  res.status(200).json(likedItems);
};

const likedItems = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user.id; // Use the userId from the decoded token

  try {
    // Check if the user has already liked the item
    const existingLike = await LikedItem.findOne({
      userId,
      itemId,
      itemType,
    });

    if (existingLike) {
      // If the like exists, remove it (unlike)
      await LikedItem.findByIdAndDelete(existingLike._id);
      res.status(201).json({ message: "Item unliked" });
    } else {
      // Create a new like record
      const newLike = new LikedItem({
        userId,
        itemId,
        itemType,
      });

      await newLike.save();
      res.status(201).json({ message: "Item liked" });
    }
  } catch (error) {
    console.error("Error handling like/unlike:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { likedItems, getLikedItems };
