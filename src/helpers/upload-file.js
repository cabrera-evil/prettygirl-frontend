const cloudinary = require("cloudinary").v2;

async function uploadFile(fielPath) {
  try {
    return await cloudinary.uploader.upload(fielPath, {
      folder: "prettygirl-api"
    })
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { uploadFile };