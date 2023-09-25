import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			max: 255,
		},
		password: {
			type: String,
			required: true,
			min: 5,
		},
		picturePath: {
			type: String,
			default: "",
		},
		friends: {
			type: Array,
			default: [],
		},
		location: String,
		occupation: String,
		bike: String,
		strava: String,
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
