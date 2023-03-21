const mongoose = require("mongoose");

const ProductionStatus = {
  file: {
    type: String,
    required: true,
  },
  approved_by_name: {
    type: String,
    required: true,
  },
  approved_on: {
    type: Date,
    required: true,
  },
};

const CampaignDetails = {
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  vehicle_impression: {
    type: String,
    required: true,
  },
  coverage_area: {
    type: String,
    required: true,
  },
  hours_driven: {
    type: String,
    required: true,
  },
  coverage_distance: {
    type: String,
    required: true,
  },
};

const campaignGoal = {

};

const DesignerCampaignSchema = new mongoose.Schema({
  ProductionStatus,
  CampaignDetails,
});

module.exports = mongoose.model("DesignerCampaign", DesignerCampaignSchema);
