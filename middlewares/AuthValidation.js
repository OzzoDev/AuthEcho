const Joi = require("joi");

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

const validateNewPassword = (newPassword, confirmNewPassword) => {
  if (newPassword.length < 8) {
    return { isValid: false, message: "Password length must be at least 8 characters long" };
  }

  if (newPassword !== confirmNewPassword) {
    return { isValid: false, message: "Passwords must match" };
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

module.exports = {
  signupValidation,
  validateNewPassword,
  emailValidation,
};
