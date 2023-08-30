import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
	secure: true,
});

// Log the configuration
console.log(cloudinary.config(), "cloudinary configuration in index.js");
const storage = new CloudinaryStorage({
	cloudinary,
	folder: "test", // Set your desired folder name
	allowedFormats: ["jpg", "jpeg", "png"],
	transformation: [{ width: 500, height: 500, crop: "limit" }],
});

const upload = multer({ storage });

export default upload;
