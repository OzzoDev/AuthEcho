const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const newAccountValidation = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({ message: "Username must be minimum 3 and maximum 20 characters long", success: false });
  }

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate({ email });

  if (error) {
    return res.status(400).json({ message: "Email is invalid", success: false });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be atleast 8 characters long", success: false });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords must match", success: false });
  }

  next();
};

const validateNewPassword = async (newPassword, confirmNewPassword, currentPassword) => {
  if (newPassword.length < 8) {
    return { isValid: false, message: "Password length must be at least 8 characters long" };
  }

  if (newPassword !== confirmNewPassword) {
    return { isValid: false, message: "Passwords must match" };
  }

  const unupdatedPassword = await bcrypt.compare(newPassword, currentPassword);

  if (unupdatedPassword) {
    return { isValid: false, message: "New password must be different from current password" };
  }

  return { isValid: true, message: "Password is valid" };
};

const emailValidation = (req, res, next) => {
  const { newEmail } = req.body;
  const schema = Joi.object({
    newEmail: Joi.string().email().required(),
  });

  const { error } = schema.validate({ newEmail });

  if (error) {
    return res.status(400).json({ message: "New email is invalid", error });
  }

  next();
};

const usernameValidation = (req, res, next) => {
  const { name } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  const { error } = schema.validate({ name });

  if (error) {
    return res.status(400).json({ message: "Username must be minimum 3 characters and maximum 20 characters long", error });
  }

  next();
};

const passwordResetValidation = async (req, res, next) => {
  const { userData, verificationCode, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isVerificationEqual = verificationCode === user.verificationCode;

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const isPasswordVaild = await validateNewPassword(newPassword, confirmNewPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  newAccountValidation,
  validateNewPassword,
  emailValidation,
  usernameValidation,
  passwordResetValidation,
};
