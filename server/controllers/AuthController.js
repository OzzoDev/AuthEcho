const bcrypt = require("bcrypt");
const Joi = require("joi");
const UserModel = require("../models/User");
const { sendEmail } = require("../middlewares/Auth");
const { validateNewPassword } = require("../middlewares/AuthValidation");
const { hex8BitKey } = require("../utils/crypto");
const { getDate } = require("../utils/date");
const { getEmailText } = require("../utils/email");
const { securityQuestions } = require("../utils/security");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Provide an username", success: false });
  }

  if (!email) {
    return res.status(400).json({ message: "Provide an email", success: false });
  }

  if (!password) {
    return res.status(400).json({ message: "Provide a password", success: false });
  }

  try {
    const userEmail = await UserModel.findOne({ email }).collation({ locale: "en", strength: 1 });
    const userName = await UserModel.findOne({ name }).collation({ locale: "en", strength: 1 });

    if (userEmail) {
      return res.status(409).json({ message: "Email already exists", success: false });
    }

    if (userName) {
      return res.status(409).json({ message: "Username already exists", success: false });
    }

    const verificationCode = hex8BitKey();

    const verificationCodeSent = await sendEmail(
      email,
      "Authecho",
      `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code during the sign up process. Return to the sign up page and enter the code and you are all set!`,
      verificationCode
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Email error ${userName}`, success: false });
    }

    const existingUsers = await UserModel.find();
    const isAdmin = existingUsers.length === 0;

    let userProperties = {};

    if (isAdmin) {
      userProperties = { name, email, password, verificationCode, adminKey: process.env.ADMIN_KEY };
    } else {
      userProperties = { name, email, password, verificationCode };
    }

    const userModel = new UserModel(userProperties);
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyAccount = async (req, res) => {
  const { userData, email, name, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }, { email: email }, { name: name }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const compairson = verificationCode === user.verificationCode;

    const newVerificationCode = hex8BitKey();

    user.verificationCode = newVerificationCode;
    user.prevVerificationCode = verificationCode;
    await user.save();

    if (!compairson) {
      if (!user.verified) {
        const verificationCodeSent = await sendEmail(
          email,
          "Authecho",
          `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code during the sign up process. Return to the sign up page and enter the code and you are all set!`,
          newVerificationCode
        );

        if (!verificationCodeSent) {
          return res.status(500).json({ message: "Email error", success: false });
        }
      } else {
        user.blocked = true;
        await user.save();
      }
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    user.blocked = false;
    await user.save();

    res.status(200).json({ message: "Verification successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const signin = async (req, res, next) => {
  const { userData, password } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.suspended || user.blocked) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Account is not verified", success: false });
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

        return res.status(403).json({
          message: "Too many failed login attempts. The account has been suspended. ",
          success: false,
        });
      }

      return res.status(403).json({ message: "Wrong password", success: false });
    }

    user.lastLogin = getDate();
    user.failedLoginAttempts = 0;
    await user.save();

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Signed in successfully";

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateEmail = async (req, res, next) => {
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
      return res
        .status(409)
        .json({ message: "New email must be different from current email", success: false });
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

    const newVerificationCode = hex8BitKey();

    user.email = newEmail;
    user.verificationCode = newVerificationCode;
    await user.save();

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Email updated successfully";

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateUsername = async (req, res, next) => {
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
      return res
        .status(409)
        .json({ message: "New username must be different from current username", success: false });
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

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Username updated successfully";

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const sendVerificationcode = async (req, res) => {
  const { userData, email, name, action } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }, { email: email }, { name: name }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.blocked || user.suspended) {
      return res
        .status(403)
        .json({ message: "Account is suspended. Unlock account to regain access" });
    }

    const userVerificationCode = user.verificationCode;

    const verificationCodeSent = await sendEmail(
      email || user.email,
      "Authecho",
      `${getEmailText(action, name || user.name)}`,
      userVerificationCode
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Verification code error`, success: false });
    }

    res.status(200).json({ message: `Verification code sent`, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const requestUnlockCode = async (req, res) => {
  const { userData } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (!user.blocked && !user.suspended) {
      return res.status(403).json({ message: "Account is active." });
    }

    const email = user.email;
    const name = user.name;
    const userVerificationCode = user.verificationCode;

    const verificationCodeSent = await sendEmail(
      email,
      "Authecho",
      `Hello ${name}! Here is the verification code to unlock your account:`,
      userVerificationCode
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Verification code error`, success: false });
    }

    res.status(200).json({ message: `Verification code sent`, success: true });
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
      return res
        .status(409)
        .json({ message: "New email must be different from current email", success: false });
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
  const { userData, password, confirmPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.blocked || user.suspended) {
      return res
        .status(403)
        .json({ message: "Account is suspended. Unlock account to regain access" });
    }

    if (user.suspended) {
      return res.status(403).json({
        message: "Account is suspended. Unlock account to reset password",
        success: false,
      });
    }

    const isPasswordVaild = await validateNewPassword(password, confirmPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    res.status(200).json({ message: isPasswordVaild.message, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { userData, password } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    user.password = await bcrypt.hash(password, 10);
    user.verificationCode = hex8BitKey();
    user.suspended = false;
    user.failedLoginAttempts = 0;
    await user.save();

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Password reset successfully";

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { userData, password, confirmPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordVaild = await validateNewPassword(password, confirmPassword, user.password);

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    req.body.user = user;
    req.body.statusCode = 200;
    req.body.message = "Password updated successfully";

    next();
    res.status(200).json({ message: "Password updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const unlockAccount = async (req, res) => {
  const { userData } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    const newVerificationCode = hex8BitKey();

    user.verificationCode = newVerificationCode;
    user.suspended = false;
    user.blocked = false;
    user.failedLoginAttempts = 0;
    await user.save();

    const email = user.email;
    const name = user.name;

    res.status(200).json({ message: "Account unlocked successfully", success: true, email, name });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const isSuspended = async (req, res) => {
  const { userData } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (!user.suspended && !user.blocked) {
      return res.status(400).json({ message: "Account is active", success: false });
    }

    res.status(200).json({ message: "Account is suspended", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const getSecurityQuestions = async (_, res) => {
  const questions = securityQuestions.map((ques) => ques.question);
  res.status(200).json({ message: "Success", success: true, questions });
};

const setSecurityQuestion = async (req, res, next) => {
  const { name, email, password, securityQuestion, securityQuestionAnswer } = req.body;

  if (!securityQuestion) {
    return res.status(400).json({ message: "Select a security question", success: false });
  }

  if (!securityQuestionAnswer) {
    return res
      .status(400)
      .json({ message: "Provide an answer to your security question", success: false });
  }

  try {
    const user = await UserModel.findOne({ name });

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({ message: "Wrong password", success: false });
    }

    user.verified = true;
    user.securityQuestion = securityQuestion;
    user.securityQuestionAnswer = await bcrypt.hash(securityQuestionAnswer.toLowerCase(), 10);
    await user.save();

    req.body.user = user;
    req.body.statusCode = 201;
    req.body.message = "Set security question successfully";

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const getUserSecurityQuestion = async (req, res) => {
  const { userData } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const question = user.securityQuestion;

    res.status(200).json({
      message: "Security question successfully fetched",
      success: true,
      question,
      isBlocked: user.blocked,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const validateSecurityQuestion = async (req, res) => {
  const { userData, securityQuestionAnswer, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    const rightAnswer = await bcrypt.compare(
      securityQuestionAnswer.toLowerCase(),
      user.securityQuestionAnswer
    );

    if (!rightAnswer) {
      return res.status(403).json({ message: "Wrong answer", success: false });
    }

    if (verificationCode !== user.verificationCode) {
      const verificationCodeSent = await sendEmail(
        user.email,
        "Authecho",
        `${getEmailText("verifyAccess", user.name)}`,
        user.verificationCode
      );

      if (!verificationCodeSent) {
        return res.status(500).json({ message: `Verification code error`, success: false });
      }
    }

    res.status(200).json({ message: `Right answer`, success: true, isBlocked: user.blocked });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const getUserAlias = async (_, res) => {
  try {
    const users = await UserModel.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found", success: false });
    }

    const userAlias = users.map((user) => ({ name: user.name, email: user.email }));
    res.status(200).json({ message: "Users retrieved successfully", success: true, userAlias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
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
  requestUnlockCode,
  validatePassword,
  resetPassword,
  updatePassword,
  unlockAccount,
  isSuspended,
  getSecurityQuestions,
  setSecurityQuestion,
  getUserSecurityQuestion,
  validateSecurityQuestion,
  getUserAlias,
};
