import { v2 as cloudinary } from "cloudinary";
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
