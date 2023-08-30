import { v2 as cloudinary } from "cloudinary";
// Uploads an image file

// const uploadImage = async (imagePath) => {
// 	// Use the uploaded file's name as the asset's public ID and
// 	// allow overwriting the asset with new versions
// 	const options = {
// 		use_filename: true,
// 		unique_filename: false,
// 		overwrite: true,
// 	};

// 	try {
// 		// Upload the image
// 		const result = await cloudinary.uploader.upload(imagePath, options);
// 		console.log(result, "cloudinary middleware");
// 		// console.log(result.secure_url, "cloudinary secure_url middleware");
// 		return result.secure_url; //removed public_id or secure_url
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

const uploadImage = async (imageBuffer) => {
	const options = {
		use_filename: true,
		unique_filename: false,
		overwrite: true,
	};

	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			options,
			(error, result) => {
				if (error) {
					console.error(error);
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
