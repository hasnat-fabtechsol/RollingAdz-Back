const requireDir = require("require-dir");
requireDir("./models", { recurse: true });

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger-output.json");
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

// Advertiser Routes

const AdvertiserAccountRoute = require("./routes/AdvertiserRoutes/AdvertiserAccountRoute");
const AdvertiserCompaignRoute = require("./routes/AdvertiserRoutes/AdvertiserCompaignRoute");
const AdvertiserInvoiceRoute = require("./routes/AdvertiserRoutes/AdvertiserInvoiceRoute");
const AdvertiserScheduleRoute = require("./routes/AdvertiserRoutes/AdvertiserScheduleRoute");
const AdvertiserSettingRoute = require("./routes/AdvertiserRoutes/AdvertiserSettingRoute");

// Photographer routes

const photographerAccountRoute = require("./routes/PhotographerRoutes/PhotographerAccountRoute");
const photographerJobRoute = require("./routes/PhotographerRoutes/PhotographerJobRoute");
const photographerPaymentRoute = require("./routes/PhotographerRoutes/PhotographerPaymentRoute");
const photographerRequestRoute = require("./routes/PhotographerRoutes/PhotographerRequestRoute");
const photographerScheduleRoute = require("./routes/PhotographerRoutes/PhotographerScheduleRoute");
const photographerSettingRoute = require("./routes/PhotographerRoutes/PhotographerSettingRoute");

// Cart Route

const cartRoute = require("./routes/CartRoute/CartRoute");
const profileRoute = require("./routes/UserProileRoute/UserProfileRoute");

//chat Route

const UploadRoute = require("./routes/ChatRoutes/UploadRoute");
const ChatRoute = require("./routes/ChatRoutes/ChatRoute");
const MessageRoute = require("./routes/ChatRoutes/MessageRoute");

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv").config();
const Populate = require("./components/pupulate");
const cors = require("cors");
const socket = require("./socket/socket.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("src/images"));
app.use(express.urlencoded({ extended: true }));
if (process.env.API_DEBUG) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
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

// Addvertiser routes app
app.use("/advertiserAccount", AdvertiserAccountRoute);
app.use("/advertiserCompaign", AdvertiserCompaignRoute);
app.use("/advertiserInvoice", AdvertiserInvoiceRoute);
app.use("/advertiserSchedule", AdvertiserScheduleRoute);
app.use("/advertiserSetting", AdvertiserSettingRoute);

/// photographer routes use

app.use("/photographerAccount", photographerAccountRoute);
app.use("/photographerJob", photographerJobRoute);
app.use("/photographerRequest", photographerRequestRoute);
app.use("/photographerPayment", photographerPaymentRoute);
app.use("/photographerSchedule", photographerScheduleRoute);
app.use("/photographerSetting", photographerSettingRoute);

// chat route use

app.use("/chat", ChatRoute);
app.use("/upload", UploadRoute);
app.use("/message", MessageRoute);

// Cart Route use

app.use("/addCart", cartRoute);
app.use("/profile", profileRoute);
app.use("/", (req, res) => {
  res.send("Working");
});
// Populate()

socket();
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
