// importing models

const installerAccount = require("./Account");
const installerJob = require("./Job");
const installerPayment = require("./Payment");
const installerRequest = require("./Request");
const installerSchedule = require("./Schedule");
const installerSetting = require("./Setting");

module.export = {
  installerSetting,
  installerSchedule,
  installerRequest,
  installerPayment,
  installerJob,
  installerAccount,
};
