const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
// import { addMessage, getMessages } from '../controllers/MessageController.js';
const ChatModel = require("../../models/ChatModel/chatModel");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:userId", requireAuth, async (req, res, next) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/find/:firstId/:secondId", requireAuth, async (req, res, next) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
