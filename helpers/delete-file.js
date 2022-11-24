const cloudinary = require("cloudinary").v2;

async function deleteFile(public_id) {
    try {
        return await cloudinary.uploader.destroy(public_id);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { deleteFile };