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
  const user = req.user;
  try {
    await sendEmailCode(user.name);
    res.status(200).json({ message: "Email sent successfully", success: true });
  } catch {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateName = async (req, res, next) => {
  const { user: userData, name } = req.body;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  console.log(req.body);
  console.log("Userdata: ", userData);

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    console.log("USer: ", user);

    console.log("Name: ", name);
    console.log("Norm Name: ", name.toLowerCase());
    console.log("Username: ", user.name);

    if (name.toLowerCase() === user.name.toLowerCase()) {
      return res
        .status(409)
        .json({ message: "New username must be different form current username", success: false });
    }

    const doesNameExists = await UserModel.findOne({ name }).collation({
      locale: "en",
      strength: 1,
    });

    if (doesNameExists) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    await changeName(user.name, name);

    req.body.user = user;
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
        .json({ message: "New email must be different form current email", success: false });
    }

    const doesEmailExists = await UserModel.findOne({ email }).collation({
      locale: "en",
      strength: 1,
    });

    if (doesEmailExists) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    if (verificationCode !== user.prevVerificationCode) {
      await sendEmailCode(user.name);
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    await changeEmail(user.name, email);

    req.body.user = user;
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

    await changePassword(user.name, password);

    req.body.user = user;
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

    await changeSecurityQuestionAnswer(user.name, securityQuestionAnswer);

    req.body.user = user;
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

    await changeSecurityQuestion(user.name, securityQuestion);

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Security question updated successfully";
    req.body.rememberUser = rememberUser;

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
};
