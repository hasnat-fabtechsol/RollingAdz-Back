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

module.exports = router;
