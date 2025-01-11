const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const UserModel = require("../models/User");
const { sendEmail } = require("../middlewares/Auth");
const { validateNewPassword } = require("../middlewares/AuthValidation");
const { hex32BitKey } = require("../utils/crypto");
const { getDate } = require("../utils/date");
const { getEmailText } = require("../utils/email");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await UserModel.findOne({ email }).collation({ locale: "en", strength: 1 });
    const userName = await UserModel.findOne({ name }).collation({ locale: "en", strength: 1 });

    if (userEmail) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    if (userName) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    const verificationCode = hex32BitKey();

    const verificationCodeSent = await sendEmail(email, "Authecho", `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code ${verificationCode} during the sign up process. Return to the sign up page and enter the code and you are all set!`);

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Email error ${userName}`, success: false });
    }

    const userModel = new UserModel({ name, email, password, verificationCode, verified: false, suspended: false });
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
  const { email, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isVerificationEqual = verificationCode === verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = hex32BitKey();

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
  const { userData, password } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isSuspended = user.suspended;

    if (isSuspended) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      const loginAttempts = user.failedLoginAttempts;
      const totalLoginAttempts = loginAttempts + 1;

      user.failedLoginAttempts = totalLoginAttempts;
      await user.save();

      if (totalLoginAttempts > 5) {
        user.suspended = true;
        await user.save();

        return res.status(403).json({ message: "Too many failed login attempts. The account has been suspended. ", success: false });
      }

      return res.status(403).json({ message: "Wrong password", success: false });
    }

    user.lastLogin = getDate();
    user.failedLoginAttempts = 0;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Signin successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateEmail = async (req, res) => {
  const { userData, email: newEmail, verificationCode } = req.body;
  const { email: currentEmail } = req.user;

  try {
    if (!newEmail) {
      return res.status(400).json({ message: "Email is not provided", success: false });
    }

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (newEmail.toLowerCase() === currentEmail.toLowerCase()) {
      return res.status(409).json({ message: "New email must be different from current email", success: false });
    }

    const schema = Joi.object({
      newEmail: Joi.string().email().required(),
    });

    const { error: emailError } = schema.validate({ newEmail });

    if (emailError) {
      return res.status(400).json({ message: emailError.details[0].message, success: false });
    }

    const emailDuplicate = await UserModel.findOne({
      email: newEmail,
      _id: { $ne: user._id },
    }).collation({ locale: "en", strength: 1 });

    if (emailDuplicate) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    const isVerificationEqual = verificationCode === user.verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = hex32BitKey();

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
  const { userData, name: newName } = req.body;
  const { name: currentName } = req.user;

  try {
    if (!newName) {
      return res.status(400).json({ message: "Username is not provided", success: false });
    }

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (newName === currentName) {
      return res.status(409).json({ message: "New username must be different from current username", success: false });
    }

    const usernameDuplicate = await UserModel.findOne({
      name: newName,
      _id: { $ne: user._id },
    }).collation({ locale: "en", strength: 1 });

    if (usernameDuplicate) {
      return res.status(409).json({ message: "Username alredy exists", success: false });
    }

    user.name = newName;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Username updated successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const sendVerificationcode = async (req, res) => {
  const { userData, action, to } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const userEmail = user.email;
    const username = user.name;
    const userVerificationCode = user.verificationCode;

    const verificationCodeSent = await sendEmail(to || userEmail, "Authecho", `${getEmailText(action, username)} ${userVerificationCode}`);

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Verification code error ${username}`, success: false });
    }

    res.status(200).json({ message: `Verification code sent for ${username}`, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const validateEmail = async (req, res) => {
  const { userData, newEmail } = req.body;

  try {
    if (!newEmail) {
      return res.status(400).json({ message: "Email is not provided", success: false });
    }

    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (newEmail.toLowerCase() === user.email.toLowerCase()) {
      return res.status(409).json({ message: "New email must be different from current email", success: false });
    }

    const emailDuplicate = await UserModel.findOne({
      email: newEmail,
      _id: { $ne: user._id },
    }).collation({ locale: "en", strength: 1 });

    if (emailDuplicate) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    res.status(200).json({ message: "Email is valid", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const validatePassword = async (req, res) => {
  const { userData, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordVaild = await validateNewPassword(newPassword, confirmNewPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    res.status(200).json({ message: isPasswordVaild.message, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
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

    const isPasswordVaild = await validateNewPassword(newPassword, confirmNewPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    const newVerificationCode = hex32BitKey();

    user.password = await bcrypt.hash(newPassword, 10);
    user.verificationCode = newVerificationCode;
    user.suspended = false;
    user.failedLoginAttempts = 0;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: `Password successfully updated for ${userName}`, success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updatePassword = async (req, res) => {
  const { userData, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordVaild = await validateNewPassword(newPassword, confirmNewPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({ message: "Password updated successfully", success: true, jwtToken });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyAuthorization = async (req, res) => {
  const { email } = req.user;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "Authorized", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const unlockAccount = async (req, res) => {
  const { userData, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (verificationCode !== user.verificationCode) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = hex32BitKey();

    user.verificationCode = newVerificationCode;
    user.suspended = false;
    user.failedLoginAttempts = 0;
    await user.save();

    console.log("Account unlocked");

    res.status(200).json({ message: "Account successfully unlocked", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const getUserData = async (req, res) => {
  const { userData } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User found", success: true, userData: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  signup,
  verifyAccount,
  signin,
  validateEmail,
  updateEmail,
  updateUsername,
  sendVerificationcode,
  validatePassword,
  resetPassword,
  updatePassword,
  verifyAuthorization,
  unlockAccount,
  getUserData,
};
