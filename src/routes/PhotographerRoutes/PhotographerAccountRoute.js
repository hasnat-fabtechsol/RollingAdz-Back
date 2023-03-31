const express = require("express");
const mongoose = require("mongoose");
const photographerAccountModel = mongoose.model("PhotographerAccount");
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
    var oldData = await photographerAccountModel.findOne({
      user: req.user._id,
    });
    var data;
    var user;
    var oldData = await photographerAccountModel.findOne({
      user: req.user._id,
    });
    if (oldData) {
      data = await photographerAccountModel.findOneAndUpdate(
        { user: req.user._id },
        updateData,
        {
          new: true,
        }
      );
      user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
        },
        {
          new: true,
        }
      );
    } else {
      data = new photographerAccountModel({
        ...updateData,
        user: req.user._id,
      });
      data.save();
      user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
        },
        {
          new: true,
        }
      );
    }

    res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    return res.status(422).send(err.message);
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const allAccounts = await photographerAccountModel.findOne({
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
    const updatedDoc = await photographerAccountModel.findOneAndUpdate(
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
    const updatedDoc = await photographerAccountModel.findOneAndDelete({
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
