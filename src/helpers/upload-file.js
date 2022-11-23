const cloudinary = require("cloudinary").v2;

// arrow async function
async function uploadFile(fielPath, type) {
  try {
    return await cloudinary.uploader.upload(fielPath, {
      folder: `prettygirl-api/${type}`,
    })
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { uploadFile };