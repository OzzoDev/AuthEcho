const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userName = await UserModel.findOne({ name });

    if (userEmail || userName) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userName = await UserModel.findOne({ name });

    if (!userEmail) {
      return res.status(403).json({ message: "Auth failed, email is wrong", success: false });
    }

    if (!userName) {
      return res.status(403).json({ message: "Auth failed, username is wrong", success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, userEmail.password);

    if (!isPasswordEqual) {
      return res.status(403).json({ message: "Auth failed, password is wrong", success: false });
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Signin successfully", success: true, jwtToken, email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { userData, email: newEmail } = req.body;
    const { email: currentEmail } = req.user;

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (newEmail && newEmail === currentEmail) {
      return res.status(409).json({ message: "New email must be different from the current email", success: false });
    }

    if (newEmail) {
      user.email = newEmail;
      await user.save();
    }

    res.status(200).json({ message: "Email updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { userData, name: newName } = req.body;
    const { name: currentName } = req.user;

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (newName && newName === currentName) {
      return res.status(409).json({ message: "New username must be different from the current username", success: false });
    }

    if (newName) {
      user.name = newName;
      await user.save();
    }

    res.status(200).json({ message: "Username updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  signin,
  updateEmail,
  updateUsername,
};
