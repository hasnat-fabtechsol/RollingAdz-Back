require("./models/User");

// importing model
require("./models/VehiclesModel/index");
require("./models/InstallerModel/index");
require("./models/DesignerModel/index");
require("./models/PhotographerModel/index");

// vehicle routes
const owerRegisterRoute = require("./routes/VehiclesRoutes/VehicleOwnerAccountRoute");
const vehicleData = require("./routes/VehiclesRoutes/VehicleDataRoute");
const vehicleCampaign = require("./routes/VehiclesRoutes/VehicleCampaignRoute");
const vehiclePayment = require("./routes/VehiclesRoutes/VehiclePaymentRouteRoute");
const vehicleRequest = require("./routes/VehiclesRoutes/VehicleRequestRoute");
const vehicleSchedule = require("./routes/VehiclesRoutes/VehicleScheduleRoute");
const vehicleSetting = require("./routes/VehiclesRoutes/VehicleSettingRoute");

// installer routes
const installerAccountRoute = require("./routes/InstallerRoutes/InstallerAccountRoute");
const installerJobRoute = require("./routes/InstallerRoutes/InstallerJobRoute");
const installerPaymentRoute = require("./routes/InstallerRoutes/InstallerPaymentRoute");
const installerRequestRoue = require("./routes/InstallerRoutes/InstallerRequestRout");
const installerScheduleRoute = require("./routes/InstallerRoutes/InstallerScheduleRoute");
const installerSettingRoute = require("./routes/InstallerRoutes/InstallerSettingRoute");

// Designer Routes

const designerAccountRoute = require("./routes/DesignerRoutes/DesignerAccountRoute");
const designerCompaignRoute = require("./routes/DesignerRoutes/DesignerCompaignRoute");
const designerInvoiceRoute = require("./routes/DesignerRoutes/DesignerInvoiceRoute");
const designerScheduleRoute = require("./routes/DesignerRoutes/DesignerScheduleRoute");
const designerSettingRoute = require("./routes/DesignerRoutes/DesignerSettingRoute");

// Photographer routes

const photographerAccountRoute = require("./routes/PhotographerRoutes/PhotographerAccountRoute");
const photographerJobRoute = require("./routes/PhotographerRoutes/PhotographerJobRoute");
const photographerPaymentRoute = require("./routes/PhotographerRoutes/PhotographerPaymentRoute");
const photographerRequestRoute = require("./routes/PhotographerRoutes/PhotographerRequestRoute");
const photographerScheduleRoute = require("./routes/PhotographerRoutes/PhotographerScheduleRoute");
const photographerSettingRoute = require("./routes/PhotographerRoutes/PhotographerSettingRoute");

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv").config();
const Populate = require("./components/pupulate");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src/images"));
app.use(express.urlencoded({ extended: true }));
app.use("/user", authRoutes);

// vehicles routes use

app.use("/ownerRegister", owerRegisterRoute);
app.use("/vehicleData", vehicleData);
app.use("/vehicleCampaign", vehicleCampaign);
app.use("/vehiclePayment", vehiclePayment);
app.use("/vehicleRequest", vehicleRequest);
app.use("/vehicleSchedule", vehicleSchedule);
app.use("/vehicleSetting", vehicleSetting);

// installer routes use
app.use("/installerAccount", installerAccountRoute);
app.use("/installerJob", installerJobRoute);
app.use("/installerPayment", installerPaymentRoute);
app.use("/installerRequest", installerRequestRoue);
app.use("/installerSchedule", installerScheduleRoute);
app.use("/installerSetting", installerSettingRoute);

// designer routes app
app.use("/designerAccount", designerAccountRoute);
app.use("/designerCompaign", designerCompaignRoute);
app.use("/designerInvoice", designerInvoiceRoute);
app.use("/designerSchedule", designerScheduleRoute);
app.use("/designerSetting", designerSettingRoute);

/// photographer routes use

app.use("/photographerAccount", photographerAccountRoute);
app.use("/photographerJob", photographerJobRoute);
app.use("/photographerRequest", photographerRequestRoute);
app.use("/photographerPayment", photographerPaymentRoute);
app.use("/photographerSchedule", photographerScheduleRoute);
app.use("/photographerSetting", photographerSettingRoute);

app.use("/", (req, res) => {
  res.send("Working");
});
// Populate()

const mongoUri = process.env.DB_URL;
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server started on port ${port}...`);
});
