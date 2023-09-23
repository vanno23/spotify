const express = require("express");
const historyData = require("../model/historyModel");

const getHistoryItems = async (req, res) => {
  const historyItems = await historyData.find({ userId: req.user.id });

  res.status(200).json(historyItems);
};

const addHistory = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user.id; // Use the userId from the decoded token

  try {
    // Check if the user has already liked the item
    const existingLike = await historyData.findOne({
      userId,
      itemId,
      itemType,
    });

    if (!existingLike) {
      // Create a new history record
      const newLike = new historyData({
        userId,
        itemId,
        itemType,
      });

      await newLike.save();
      res.status(201).json({ message: "Item saved" });
    } else {
      res.status(201).json({ message: "Item already saved" });
    }
  } catch (error) {
    console.error("Error handling item saved:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const deleteHistory = async (req, res) => {
  const { itemId, itemType } = req.body;
  const userId = req.user.id; // Use the userId from the decoded token

  try {
    // Find and delete the history item
    const deletedItem = await historyData.findOneAndDelete({
      userId,
      itemId,
      itemType,
    });

    if (!deletedItem) {
      res.status(404).json({ message: "Item not found in history" });
    } else {
      res.status(200).json({ message: "Item deleted from history" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { addHistory, getHistoryItems, deleteHistory };
