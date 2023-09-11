import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Uploads an image file

const uploadImage = async (imageBuffer) => {
	const options = {
		use_filename: true,
		unique_filename: true,
		overwrite: true,
	};

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			options,
			(error, result) => {
				if (error) {
					console.error(error, middleware);
					reject(error);
				} else {
					console.log(result, "cloudinary middleware");
					resolve(result.secure_url);
				}
			}
		);

		uploadStream.end(imageBuffer);
	});
};

export default uploadImage;
