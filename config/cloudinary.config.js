// config/cloudinary.config.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "movie-gallery" // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  }
});

module.exports = multer({ storage });
