const sharp = require("sharp");
module.exports = {
  bufforToString: (b64) => {
    return "data:" + "image/webp" + ";base64," + b64;
  },

  compressImg: async (buffer) => {
    return await sharp(buffer)
      .resize({ width: 250, height: 250 })
      .webp({ quality: 60 })
      .toBuffer();
  },
};
