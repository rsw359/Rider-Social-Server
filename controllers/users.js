import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);
		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				bike,
				strava,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					bike,
					strava,
					location,
					picturePath,
				};
			}
		);
		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);
		console.log("user:", user);
		console.log("friend:", friend);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((friendId) => friendId !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}
		await user.save();
		await friend.save();

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);

		const formattedFriends = friends.map(
			({
				_id,
				firstName,
				lastName,
				occupation,
				location,
				bike,
				strava,
				picturePath,
			}) => {
				return {
					_id,
					firstName,
					lastName,
					occupation,
					bike,
					strava,
					location,
					picturePath,
				};
			}
		);
		console.log("friends:", friends);
		console.log("formattedfriends:", formattedFriends);

		res.status(200).json(formattedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
