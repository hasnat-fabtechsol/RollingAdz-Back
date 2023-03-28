const express = require("express");
const mongoose = require("mongoose");
const photographerSettingModel = mongoose.model("PhotographerSetting");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.put("/", requireAuth, async (req, res) => {
  try {
    var updateData = {};
    for (let [key, value] of Object.entries(req.body)) {
      if (value) updateData = { ...updateData, [key]: value };
    }
    var data;
    var oldData = await photographerSettingModel.findOne({
      user: req.user._id,
    });
    if (oldData) {
      data = await photographerSettingModel.findOneAndUpdate(
        { user: req.user._id },
        updateData,
        {
          new: true,
        }
      );
    } else {
      data = new photographerSettingModel({
        ...updateData,
        user: req.user._id,
      });
      data.save();
    }

    res.send(data);
  } catch (err) {
    console.log(err.message);
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const allAccounts = await photographerSettingModel.findOne({
      user: req.user._id,
    });
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await photographerSettingModel.findOneAndUpdate(
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
    const updatedDoc = await photographerSettingModel.findOneAndDelete({
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
