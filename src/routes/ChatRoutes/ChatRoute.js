const express = require("express");
const ChatModel = require("../../models/ChatModel/chatModel");
const requireAuth = require("../../middlewares/requireAuth");
const axios = require("axios"); // Import the axios module
const router = express.Router();

const API = axios.create({ baseURL: "http://localhost:5000" });

router.post("/", requireAuth, async (req, res) => {
  const newChat = {
    members: [req.body.senderId, req.body.receiverId],
  };
  try {
    const result = await API.post("/chat/", newChat);
    res.status(200).json(result.data);
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

router.get("/find/:firstId/:secondId", requireAuth, async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId;
  try {
    const result = await API.get(`/chat/find/${firstId}/${secondId}`);
    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
