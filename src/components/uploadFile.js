const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dinmm7dvx",
  api_key: "657561951328716",
  api_secret: "9hD-z00aOfulMXw7Y1Q5lpwnSF8",
});
const uploadFile = async (file ) => {
  const result = await cloudinary.uploader.upload(file.path, {
    resource_type: "auto",
    public_id: file.originalname,
    overwrite: true
  });
  return result.secure_url;
};

module.exports = uploadFile;
