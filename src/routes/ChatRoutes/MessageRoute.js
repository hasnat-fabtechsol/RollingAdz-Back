const express = require("express");
const mongoose = require("mongoose");
// import { addMessage, getMessages } from '../controllers/MessageController.js';
const MessageModel = require("../../models/ChatModel/messageModel");
const requireAuth = require("../../middlewares/requireAuth");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const messageModel = require("../../models/ChatModel/messageModel");

const router = express.Router();

router.post("/", upload.single("file"), requireAuth, async (req, res, next) => {
  try {
    const { chatId, senderId, text, file } = req.body;
    console.log(req.file, "req");
    // var updateData = {};
    // for (let [key, value] of Object.entries(req.body)) {
    //   if (value) updateData = { ...updateData, [key]: value };
    // }
    if (req.file) {
      let result = await uploadFile(req.file?.path);
      console.log("result", result);
      // updateData = { ...updateData, file: result };

      const message = new messageModel({
        chatId,
        senderId,
        file: result,
      });

      const data = await message.save();
      console.log("---------data", message);
      res.status(200).json(message);
    } else {
      const message = new MessageModel({
        chatId,
        senderId,
        text,
      });
      const result = await message.save();
      console.log("============dh", result);
      res.status(200).json(result);
    }
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
