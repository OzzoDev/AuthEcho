const Joi = require("joi");
const bcrypt = require("bcrypt");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message, error });
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

module.exports = {
  signupValidation,
  validateNewPassword,
  emailValidation,
  usernameValidation,
};
