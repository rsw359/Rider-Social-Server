import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import uploadImage from "../middleware/cloudinary.js";

/* register  user*/
export const register = async (req, res) => {
	console.log("request body", req.body);
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			friends,
			location,
			bike,
			strava,
			occupation,
		} = req.body;

		const picturePath = req.file.buffer; //changed from req.file.path for disk storage

		// console.log(picturePath, "picture path");
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const pictureUrl = await uploadImage(picturePath);
		console.log(pictureUrl, "picture log");

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			picturePath: pictureUrl,
			friends,
			location,
			bike,
			strava,
			occupation,
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.error(err.message, "error message line 47");
	}
};

/* login user */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ msg: "user does not exist" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message }, "login error, auth line 65");
	}
};
