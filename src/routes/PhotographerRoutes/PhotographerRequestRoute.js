const express = require("express");
const mongoose = require("mongoose");
const photographerRequestModel = mongoose.model("PhotographerRequest");
const User = mongoose.model("User");
const requireAuth = require("../../middlewares/requireAuth");
const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const request = new photographerRequestModel({
      ...req.body,
      user: _id,
    });
    await request.save();
    res.send(request);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  var { _id } = req.user;
  photographerRequestModel
    .find({ user: _id })
    .populate("user", { password: 0 })
    .exec(function (err, request) {
      if (err) throw err;
      res.send(request);
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await photographerRequestModel.findOneAndUpdate(
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
    const updatedDoc = await photographerRequestModel.findOneAndDelete({
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
