const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const DesignerCampaignModel = mongoose.model("DesignerCampaign");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "campaign_image", maxCount: 1 },
    { name: "current_report", maxCount: 1 },
    { name: "previous_reports", maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      let updateData = {};
      if (req.files) {
        for (let [key, value] of Object.entries(req.files)) {
          let result = await uploadFile(value[0]?.path);
          updateData = { ...updateData, [key]: result };
        }
      }
      // const vehicleCampaign = new VehiclesCampaignModel(req.body);
      const DesignerCampaign = new DesignerCampaignModel({
        ...req.body,
        images: updateData,
      });
      await DesignerCampaign.save();
      res.send(DesignerCampaign);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const allAccounts = await DesignerCampaignModel.find({});
    res.json(allAccounts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoc = await DesignerCampaignModel.findOneAndUpdate(
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
    const updatedDoc = await DesignerCampaignModel.findOneAndDelete({
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
