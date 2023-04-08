const express = require("express");
const mongoose = require("mongoose");
// import { addMessage, getMessages } from '../controllers/MessageController.js';
const MessageModel = require("../../models/ChatModel/messageModel");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  const { chatId, senderId, text, file } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    file,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:chatId", requireAuth, async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
