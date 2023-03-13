import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RiderUser from "../models/User.js";

/* register  user*/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRiderUser = new RiderUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedRiderUser = await newRiderUser.save();
    res.status(201).json(savedRiderUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* login user */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RiderUser.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "user does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
