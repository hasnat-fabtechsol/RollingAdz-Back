const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const AdvertiserCampaignModel = mongoose.model("AdvertiserCampaign");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();
router.post("/", requireAuth, async (req, res, next) => {
  const { _id } = req.user;
  
  try {
    const request = new AdvertiserCampaignModel({
      ...req.body,
      user: _id,
    });
    const data = await request.save();
    res.status(200).send(data);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const allAccounts = await AdvertiserCampaignModel.findOne(
      {
        user: req.user._id,
      },
      { password: 0 }
    );
    res.send(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await AdvertiserCampaignModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(updatedDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await AdvertiserCampaignModel.findOneAndDelete({
      _id: id,
    });

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json(updatedDoc);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
