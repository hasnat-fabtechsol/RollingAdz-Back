const express = require("express");
const ChatModel = require("../../models/ChatModel/chatModel");
const requireAuth = require("../../middlewares/requireAuth");
const axios = require("axios"); // Import the axios module
const chatModel = require("../../models/ChatModel/chatModel");
const router = express.Router();

const API = axios.create({ baseURL: "http://localhost:5000" });

router.post("/", requireAuth, async (req, res) => {
  console.log(req.body, "------------");
  try {
    const newChat = new ChatModel({ members: req.body });
    const savedChat = await newChat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:userId", requireAuth, async (req, res) => {
  const id = req.params.userId;
  // try {
  //   const result = await API.get(`/chat/${id}`);
  //   res.status(200).json(result.data);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/find/:firstId/:secondId", requireAuth, async (req, res) => {
//   const firstId = req.params.firstId;
//   const secondId = req.params.secondId;
//   try {
//     // const result = await API.get(`/chat/find/${firstId}/${secondId}`);
//     const chat = await chatModel.save
//     res.status(200).json(result.data);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.get("/find/:firstId/:secondId", requireAuth, async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;

  try {
    // Check if a chat between these two users already exists
    const chatExists = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    // If a chat already exists, return its data
    if (chatExists) {
      return res.status(200).json(chatExists);
    }

    // If a chat does not exist, create a new chat document
    const newChat = new ChatModel({
      members: [firstId, secondId],
    });

    // Save the new chat document to the database
    const savedChat = await newChat.save();

    res.status(200).json(savedChat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
