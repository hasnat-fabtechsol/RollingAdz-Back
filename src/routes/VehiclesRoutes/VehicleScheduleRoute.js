const express = require("express");
const mongoose = require("mongoose");
const VehiclesScheduleModel = mongoose.model("VehiclesSchedule");
const requireAuth = require("../../middlewares/requireAuth");
const User = mongoose.model("User");
const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  const { _id } = req.user;
  try {
    const vehicleSchedule = new VehiclesScheduleModel({
      ...req.body,
      user: _id,
    });
    await vehicleSchedule.save();
    res.send(vehicleSchedule, { password: 0 });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  const { _id } = req.user;

  try {
    const allAccounts = await VehiclesScheduleModel.find({ user: _id });
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await VehiclesScheduleModel.findOneAndUpdate(
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
    const updatedDoc = await VehiclesScheduleModel.findOneAndDelete({
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
