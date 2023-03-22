const mongoose = require("mongoose");

const images = {
  file: {
    type: String,
    required: true,
  },
  campaign_image: {
    type: String,
    required: true,
  },
  current_report: {
    type: String,
    required: true,
  },
  previous_reports: [
    {
      type: String,
      required: true,
    },
  ],
};

const DesignerCampaignSchema = new mongoose.Schema({
  approved_by_name: {
    type: String,
    required: true,
  },
  approved_on: {
    type: Date,
    required: true,
  },
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
  goal: {
    type: String,
    required: true,
  },
  target_age: {
    type: String,
    required: true,
  },
  target_gender: {
    type: String,
    required: true,
  },
  income_level: {
    type: String,
    required: true,
  },
  target_ethncity: {
    type: String,
    required: true,
  },
  behavioral: {
    type: String,
    required: true,
  },
  retaget_impression: {
    type: Number,
    required: true,
  },
  total_click: {
    type: Number,
    required: true,
  },
  click_rate: {
    type: String,
    required: true,
  },
  cost_impression: {
    type: String,
    required: true,
  },
  retarget_url: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  campaign_message: {
    type: String,
    required: true,
  },
  images,
});

module.exports = mongoose.model("DesignerCampaign", DesignerCampaignSchema);
