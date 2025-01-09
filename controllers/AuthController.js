const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const UserModel = require("../models/User");
const { sendEmail } = require("../middlewares/Auth");
const { validateNewPassword } = require("../middlewares/AuthValidation");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userName = await UserModel.findOne({ name });

    if (userEmail) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    if (userName) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const verificationCodeSent = await sendEmail(email, "Authecho", `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code ${verificationCode} during the sign up process. Return to the sign up page and enter the code and you are all set!`);

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Email error ${userName}`, success: false });
    }

    const userModel = new UserModel({ name, email, password, verificationCode, verified: false });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    const user = await UserModel.findOne({ email });
    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({ message: "Signup successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isVerificationEqual = verificationCode === verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = newVerificationCode;
    user.verified = true;
    await user.save();

    res.status(201).json({ message: "Verification successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const signin = async (req, res) => {
  try {
    const { userData, password } = req.body;
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({ message: "Wrong password", success: false });
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Signin successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateEmail = async (req, res) => {
  try {
    const { userData, email: newEmail, verificationCode } = req.body;
    const { email: currentEmail } = req.user;

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (!newEmail) {
      return res.status(400).json({ message: "Email is not provided", success: false });
    }

    if (newEmail && newEmail === currentEmail) {
      return res.status(409).json({ message: "New email must be different from the current email", success: false });
    }

    const schema = Joi.object({
      newEmail: Joi.string().email().required(),
    });

    const { error: emailError } = schema.validate({ newEmail });

    if (emailError) {
      return res.status(400).json({ message: emailError.details[0].message, success: false });
    }

    const isVerificationEqual = verificationCode === user.verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.email = newEmail;
    user.verificationCode = newVerificationCode;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Email updated successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
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
    console.error(error);
  }
};

const sendVerificationcode = async (req, res) => {
  const { userData, emailBodyText, to } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const userEmail = user.email;
    const userName = user.name;
    const userVerificationCode = user.verificationCode;

    const verificationCodeSent = await sendEmail(to || userEmail, "Authecho", `${emailBodyText} ${userVerificationCode}`);

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Verification code error ${userName}`, success: false });
    }

    res.status(200).json({ message: `Verification code sent for ${userName}`, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error sending verification code", success: false });
    console.error(`Error sending verification code for user: ${userData}`, error);
  }
};

const validatePassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  const isPasswordVaild = validateNewPassword(newPassword, confirmNewPassword);

  if (!isPasswordVaild.isValid) {
    return res.status(400).json({ message: isPasswordVaild.message, success: false });
  }

  res.status(200).json({ message: isPasswordVaild.message, success: true });
};

const resetPassword = async (req, res) => {
  const { userData, verificationCode, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const userName = user.name;

    const isVerificationEqual = verificationCode === user.verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const isPasswordVaild = validateNewPassword(newPassword, confirmNewPassword);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.password = await bcrypt.hash(newPassword, 10);
    user.verificationCode = newVerificationCode;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: `Password successfully updated for ${userName}`, success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", success: false });
    console.error(`Error resetting password for user: ${userData}`, error);
  }
};

const verifyAuthorization = async (req, res) => {
  const { email } = req.user;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Usery not found", success: false });
  }

  res.status(200).json({ message: "Authorized", success: true });
};

const getUserData = async (req, res) => {
  const { userData } = req.body;
  const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  res.status(200).json({ message: "User found", success: true, userData: { name: user.name, email: user.email } });
};

module.exports = {
  signup,
  verifyAccount,
  signin,
  updateEmail,
  updateUsername,
  sendVerificationcode,
  validatePassword,
  resetPassword,
  verifyAuthorization,
  getUserData,
};
