const express = require("express");
const mongoose = require("mongoose");
const installerAccountModel = mongoose.model("InstallerAccount");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const installerRegister = new installerAccountModel(req.body);
    await installerRegister.save();
    res.send(installerRegister);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await installerAccountModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await installerAccountModel.findOneAndUpdate(
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
    const updatedDoc = await installerAccountModel.findOneAndDelete({
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
