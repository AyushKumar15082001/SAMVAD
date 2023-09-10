const cloudinary = require("cloudinary").v2
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (path, folder = "my-profile") => {
    try {
        const data = await cloudinary.uploader.upload(path, { folder: folder });
        return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        const data = await cloudinary.uploader.destroy(publicId);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteMultipleFromCloudinary = async (publicIds) => {
    try {
        const data = await cloudinary.api.delete_resources(publicIds);
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = { uploadToCloudinary,deleteFromCloudinary, deleteMultipleFromCloudinary }