const express = require("express");
const mongoose = require("mongoose");
const uploadFile = require("../../components/uploadFile");
const upload = require("../../middlewares/uploadMulter");
const VehiclesCampaignModel = mongoose.model("VehiclesCampaign");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "campaign_img", maxCount: 1 },
    { name: "before_installation", maxCount: 1 },
    { name: "after_installation", maxCount: 1 },
    { name: "during_campaign", maxCount: 1 },
    { name: "after_removel", maxCount: 1 },
    { name: "special_events", maxCount: 1 },
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
      const vehicleCampaign = new VehiclesCampaignModel({
        ...req.body,
        compaign_photos: updateData,
      });
      await vehicleCampaign.save();
      res.send(vehicleCampaign);
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

module.exports = router;
