const express = require("express");
const mongoose = require("mongoose");
const photographerSettingModel = mongoose.model("PhotographerSetting");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");

const router = express.Router();

router.put("/", requireAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;

    const register = await photographerSettingModel.findOne({
      user: _id,
    }).populate("user");
    if (register) {
      register.set({
        ...req.body,
        user: _id,
      });
      await register.save();
      res.send(register.toJSON({ password: 0 }));
    } else {
      const setting = new photographerSettingModel({
        ...req.body,
        user: _id,
      });
      await setting.save();
      res.send(setting.toJSON({ password: 0 }));
    }
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  var { _id } = req.user;
  try {
    const allAccounts = await photographerSettingModel.find({ user: _id });
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
