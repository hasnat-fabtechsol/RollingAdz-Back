const express = require("express");
const mongoose = require("mongoose");
const MessageModel = require("../../models/ChatModel/messageModel");
const UserModel = require("../../models/User");
const requireAuth = require("../../middlewares/requireAuth");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const messageModel = require("../../models/ChatModel/messageModel");

const router = express.Router();

router.post("/", upload.single("file"), requireAuth, async (req, res, next) => {
  try {
    const { chatId, senderId, text, file } = req.body;
    if (req.file) {
      const { mimetype } = req.file;
      console.log(req.file);
      let result = await uploadFile(req.file);

      let file_type = "other";
      if (mimetype.startsWith("image/")) file_type = "image";
      else if (mimetype.startsWith("video/")) file_type = "video";

      const message = new messageModel({
        chatId,
        senderId,
        file: result,
        file_type,
      });

      const data = await message.save();
      res.status(200).json(data);
    } else {
      const message = new MessageModel({
        chatId,
        senderId,
        text,
      });
      const result = await message.save();
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
