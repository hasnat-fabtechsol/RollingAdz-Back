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
    { name: "during_campaign", maxCount: 1 },
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
        compaign_photos: updateData,
      });
      await DesignerCampaign.save();
      res.send(DesignerCampaign);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

module.exports = router;
