const mongoose = require("mongoose");

const compaign_photos = {
  before_installation: {
    type: String,
    required: true,
  },
  after_installation: {
    type: String,
    required: true,
  },
  during_campaign: {
    type: String,
    required: true,
  },
  after_removel: {
    type: String,
    required: true,
  },
  special_events: {
    type: String,
    required: true,
  },
  campaign_img: {
    type: String,
    required: true,
  },
};

const CampaignSchema = new mongoose.Schema({
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  total_miles: {
    type: String,
    required: true,
  },
  total_hours: {
    type: String,
    required: true,
  },
  total_impressions: {
    type: Number,
    required: true,
  },
  earning: {
    type: String,
    required: true,
  },
  install_date_time: {
    type: String,
    required: true,
  },
  swarm: {
    type: String,
    required: true,
  },
  photoshoot: {
    type: String,
    required: true,
  },
  removal: {
    type: String,
    required: true,
  },
  compaign_photos,
  map: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VehiclesCampaign", CampaignSchema);
