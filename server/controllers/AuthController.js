const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code ${verificationCode} during the sign up process. Return to the sign up page and enter the code and you are all set!`
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Email error ${userName}`, success: false });
    }

    const userModel = new UserModel({ name, email, password, verificationCode });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyAccount = async (req, res) => {
  const { userData, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isVerificationEqual = verificationCode === user.verificationCode;

    user.verificationCode = hex8BitKey();
    await user.save();

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    user.verified = true;
    await user.save();

    res.status(201).json({ message: "Verification successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const signin = async (req, res) => {
  const { userData, password, rememberUser } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Account is not verified", success: false });
    }

    if (user.suspended) {
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

    const name = user.name;
    const email = user.email;

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: "Signin successfully", success: true, name, email });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateEmail = async (req, res) => {
  const { userData, email: newEmail, verificationCode, rememberUser } = req.body;
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

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: "Email updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updateUsername = async (req, res) => {
  const { userData, name: newName, rememberUser } = req.body;
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

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: "Username updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const sendVerificationcode = async (req, res) => {
  const { userData, action } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const userEmail = user.email;
    const username = user.name;
    const userVerificationCode = user.verificationCode;

    const verificationCodeSent = await sendEmail(
      userEmail,
      "Authecho",
      `${getEmailText(action, username)} ${userVerificationCode}`
    );

    if (!verificationCodeSent) {
      return res
        .status(500)
        .json({ message: `Verification code error ${username}`, success: false });
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
  const { userData, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.suspended) {
      return res.status(403).json({
        message: "Account is suspended. Unlock account to reset password",
        success: false,
      });
    }

    const isPasswordVaild = await validateNewPassword(
      newPassword,
      confirmNewPassword,
      user.password
    );

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
  const { userData, newPassword, rememberUser } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    const newVerificationCode = hex8BitKey();

    user.password = await bcrypt.hash(newPassword, 10);
    user.verificationCode = newVerificationCode;
    user.suspended = false;
    user.failedLoginAttempts = 0;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: `Password successfully updated`, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const updatePassword = async (req, res) => {
  const { userData, newPassword, confirmNewPassword, rememberUser } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordVaild = await validateNewPassword(
      newPassword,
      confirmNewPassword,
      user.password
    );

    if (!isPasswordVaild.isValid) {
      return res.status(400).json({ message: isPasswordVaild.message, success: false });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: "Password updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyAuthentication = async (req, res) => {
  if (req.cookies.jwtToken) {
    const jwtToken = req.cookies.jwtToken;
    const rememberUser = req.cookies.rememberUser;

    console.log("JWT token: ", jwtToken);
    console.log("Remember User: ", rememberUser);

    if (
      rememberUser === "" ||
      rememberUser === "undefined" ||
      rememberUser === "false" ||
      rememberUser === false
    ) {
      res.cookie("jwtToken", "", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        expires: new Date(0),
        path: "/",
      });
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    console.log("Decoded jwt token: ", decoded);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthenticated",
        success: false,
      });
    }

    return res.status(200).json({ message: "Authenticated", success: true });
  }
  res.status(401).json({ message: "Unauthenticated", success: false });
};

const unlockAccount = async (req, res) => {
  const { userData, verificationCode, rememberUser } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (verificationCode !== user.verificationCode) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const newVerificationCode = hex8BitKey();

    user.verificationCode = newVerificationCode;
    user.suspended = false;
    user.failedLoginAttempts = 0;
    await user.save();

    const jwtToken = jwt.sign({ email: user.email, _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };

    if (rememberUser) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      cookieOptions.expires = expires;
    }

    res.cookie("jwtToken", jwtToken, cookieOptions);

    res.cookie("rememberUser", rememberUser, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: rememberUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : 0,
    });

    res.status(200).json({ message: "Account successfully unlocked", success: true });
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

    if (!user.suspended) {
      return res.status(400).json({ message: "Account is active", success: false });
    }

    res.status(200).json({ message: "Account is suspended", success: true });
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

    res.status(200).json({
      message: "User found",
      success: true,
      userData: { name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const getSecurityQuestions = async (_, res) => {
  res.status(200).json({ message: "Success", success: true, questions: securityQuestions });
};

const setSecurityQuestion = async (req, res, next) => {
  const { name, email, password, securityQuestion, securityQuestionAnswer, rememberUser } =
    req.body;

  try {
    const user = await UserModel.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({ message: "Wrong password", success: false });
    }

    const verificationCodeSent = await sendEmail(
      email,
      "Authecho",
      `Welcome to Authecho ${name}! To successfully sign up you need to verify your email by entering this verification code ${user.verificationCode} during the sign up process. Return to the sign up page and enter the code and you are all set!`
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Email error ${userName}`, success: false });
    }

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
  const { userData, verificationCode } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isVerificationEqual = verificationCode === user.verificationCode;

    user.verificationCode = hex8BitKey();
    await user.save();

    if (!isVerificationEqual) {
      return res.status(400).json({ message: "Verification code is wrong", success: false });
    }

    const question = user.securityQuestion;

    res
      .status(200)
      .json({ message: "Security question successfully fetched", success: true, question });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const validateSecurityQuestion = async (req, res) => {
  const { userData, securityQuestionAnswer } = req.body;

  try {
    const user = await UserModel.findOne({ $or: [{ email: userData }, { name: userData }] });

    const rightAnswer = await bcrypt.compare(
      securityQuestionAnswer.toLowerCase(),
      user.securityQuestionAnswer
    );

    if (!rightAnswer) {
      return res.status(403).json({ message: "Wrong answer", success: false });
    }

    res.status(200).json({ message: `Right answer`, success: true });
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
  verifyAuthentication,
  unlockAccount,
  isSuspended,
  getUserData,
  getSecurityQuestions,
  setSecurityQuestion,
  getUserSecurityQuestion,
  validateSecurityQuestion,
};
