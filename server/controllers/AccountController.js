const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const { sendEmailCode } = require("../services/emailService");
const {
  changeName,
  changeEmail,
  changePassword,
  changeSecurityQuestionAnswer,
  changeSecurityQuestion,
} = require("../services/userService");

const REMEMBER_USER_KEY = "rememberUser";

const accountOverview = async (req, res) => {
  const userData = req.user;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({ email: userData.email }).collation({
      locale: "en",
      strength: 1,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const lastLogin = user.lastLogin;
    const createdAt = user.createdAt;
    const securityQuestion = user.securityQuestion;
    const isRemembered = rememberUser ? true : false;
    const createdApps = user.createdApps;
    const adminApps = user.adminApps;
    const appConnections = user.appConnections;

    res.status(200).json({
      message: "Success",
      success: true,
      securityQuestion,
      createdAt,
      lastLogin,
      isRemembered,
      createdApps,
      adminApps,
      appConnections,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const requestEmailCode = async (req, res) => {
  const { email } = req.body;
  const user = req.user;

  try {
    await sendEmailCode(user.name, email);
    res.status(200).json({ message: "Email sent successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateName = async (req, res, next) => {
  const { user: userData, name } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    if (name.toLowerCase() === user.name.toLowerCase()) {
      return res
        .status(409)
        .json({ message: "New username must be different from current username", success: false });
    }

    const doesNameExists = await UserModel.findOne({ name }).collation({
      locale: "en",
      strength: 1,
    });

    if (doesNameExists) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    const updatedUser = await changeName(user.name, name);

    req.body.user = updatedUser;
    req.body.statusCode = 200;
    req.body.message = "Username updated successfully";
    req.body.rememberUser = rememberUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateEmail = async (req, res, next) => {
  const { user: userData, email, verificationCode } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    if (email.toLowerCase() === user.email.toLowerCase()) {
      return res
        .status(409)
        .json({ message: "New email must be different from current email", success: false });
    }

    const doesEmailExists = await UserModel.findOne({ email }).collation({
      locale: "en",
      strength: 1,
    });

    if (doesEmailExists) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    if (verificationCode !== user.prevVerificationCode) {
      await sendEmailCode(user.name, email);
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const updatedUser = await changeEmail(user.name, email);

    req.body.user = updatedUser;
    req.body.statusCode = 200;
    req.body.message = "Email updated successfully";
    req.body.rememberUser = rememberUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { user: userData, password } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    const isPasswordSameAsOld = await bcrypt.compare(password, user.password);

    if (isPasswordSameAsOld) {
      return res
        .status(409)
        .json({ message: "New password must be different from current password", success: false });
    }

    const updatedUser = await changePassword(user.name, password);

    req.body.user = updatedUser;
    req.body.statusCode = 200;
    req.body.message = "Password updated successfully";
    req.body.rememberUser = rememberUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateSecurityQuestionAnswer = async (req, res, next) => {
  const { user: userData, securityQuestionAnswer } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    const isAnswerSameAsOld = await bcrypt.compare(
      securityQuestionAnswer,
      user.securityQuestionAnswer
    );

    if (isAnswerSameAsOld) {
      return res.status(409).json({
        message: "New answer to security question must be different from current answer",
        success: false,
      });
    }

    const updatedUser = await changeSecurityQuestionAnswer(
      user.name,
      securityQuestionAnswer.toLowerCase()
    );

    req.body.user = updatedUser;
    req.body.statusCode = 200;
    req.body.message = "Answer to security question updated successfully";
    req.body.rememberUser = rememberUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateSecurityQuestion = async (req, res, next) => {
  const { user: userData, securityQuestion } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    const updatedUser = await changeSecurityQuestion(user.name, securityQuestion);

    req.body.user = updatedUser;
    req.body.statusCode = 200;
    req.body.message = "Security question updated successfully";
    req.body.rememberUser = rememberUser;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const deleteAccount = async (req, res, next) => {
  const { deleteCommand } = req.body;
  const name = req.user.name;

  try {
    const isDeleteConfirmed = deleteCommand.toLowerCase() === `delete ${name.toLowerCase()}`;

    if (!isDeleteConfirmed) {
      return res
        .status(400)
        .json({ message: "Deletion failed due to the absence of confirmation", success: false });
    }

    const deleteResult = await UserModel.deleteOne({ name });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  accountOverview,
  requestEmailCode,
  updateName,
  updateEmail,
  updatePassword,
  updateSecurityQuestionAnswer,
  updateSecurityQuestion,
  deleteAccount,
};
