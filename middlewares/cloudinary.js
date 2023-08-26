const { v2: cloud } = require("cloudinary");
const { bufforToString } = require("../utils/buffer");

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUD_SECRET,
  api_key: process.env.CLOUD_API_KEY,
});

const saveCloudImage = async (base64) => {
  return await cloud.uploader.upload(bufforToString(base64), {
    resource_type: "auto",
    allowed_formats: ["gif", "webp", "png", "jpg"],
  });
};

module.exports = { cloud, saveCloudImage };
