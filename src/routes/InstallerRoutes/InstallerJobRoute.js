const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const InstallerJobModel = mongoose.model("InstallerJob");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
    { name: "url", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      let updateData = {};
      if (req.files) {
        for (let [key, value] of Object.entries(req.files)) {
          let result = await uploadFile(value[0]?.path);
          updateData = { ...updateData, [key]: result };
        }
      }
      const installerJob = new InstallerJobModel({
        ...req.body,
        photos: updateData,
      });
      await installerJob.save();
      res.send(installerJob);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await InstallerJobModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await InstallerJobModel.findOneAndUpdate(
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
    const updatedDoc = await InstallerJobModel.findOneAndDelete({
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
