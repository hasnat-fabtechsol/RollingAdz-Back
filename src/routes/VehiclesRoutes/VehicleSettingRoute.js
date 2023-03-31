const express = require("express");
const mongoose = require("mongoose");
const VehiclesSettingModel = mongoose.model("VehiclesSetting");
const requireAuth = require("../../middlewares/requireAuth");
const User = mongoose.model("User");
const router = express.Router();

router.put("/", requireAuth, async (req, res) => {
  try {
    var data;
    var oldData = await VehiclesSettingModel.findOne({ user: req.user._id });
    if (oldData) {
      data = await VehiclesSettingModel.findOneAndUpdate(
        { user: req.user._id },
        ...req.body,
        {
          new: true,
        }
      );
    } else {
      data = new VehiclesSettingModel({ ...updateData, user: req.user._id });
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
    const allAccounts = await VehiclesSettingModel.findOne({
      user: req.user._id,
    });
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesSettingModel.findOneAndUpdate(
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

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesSettingModel.findOneAndDelete({
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
