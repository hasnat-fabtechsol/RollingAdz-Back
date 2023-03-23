const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const photographerJobModel = mongoose.model("PhotographerJob");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "device_vehicle_info_img", maxCount: 1 },
    { name: "upload_photo", maxCount: 1 },
    { name: "invoice", maxCount: 1 },
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
      const PhotographerJob = new photographerJobModel({
        ...req.body,
        photos: updateData,
      });
      await PhotographerJob.save();
      res.send(PhotographerJob);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await photographerJobModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await photographerJobModel.findOneAndUpdate(
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
    const updatedDoc = await photographerJobModel.findOneAndDelete({
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