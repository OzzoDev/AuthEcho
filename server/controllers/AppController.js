const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const { sendEmail } = require("../middlewares/Auth");
const { hex8BitKey } = require("../utils/crypto");
const { getDate } = require("../utils/date");

const requestCode = async (req, res) => {
  const appName = req.headers["authecho-app-name"];
  const user = req.user;

  try {
    if (user.blocked) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    const verificationCodeSent = await sendEmail(
      user.email,
      `Sign in to ${appName}`,
      `Hello ${user.name}! This is your verification code to sign in with your authecho accout at ${appName}: ${user.verificationCode}`
    );

    if (!verificationCodeSent) {
      return res.status(500).json({ message: `Verification code error`, success: false });
    }

    res
      .status(200)
      .json({ message: "Successfully signed in", success: true, question: user.securityQuestion });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const verifyCode = async (req, res) => {
  const { user: userData, verificationCode } = req.body;

  if (!verificationCode) {
    return res
      .status(400)
      .json({ message: "Verification code is missing in request body", success: false });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    if (user.blocked) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    const userVerificationCode = user.verificationCode;

    user.verificationCode = hex8BitKey();
    user.prevVerificationCode = verificationCode;
    await user.save();

    if (verificationCode !== userVerificationCode) {
      user.blocked = true;
      await user.save();
      return res.status(403).json({ message: "Verification code is wrong", success: false });
    }

    res.status(200).json({ message: "Verification successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const validateQuestion = async (req, res) => {
  const { user: userData, questionAnswer } = req.body;

  if (!questionAnswer) {
    return res
      .status(400)
      .json({ message: "Answer to security question is missing in request body", success: false });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    const isRightAnswer = await bcrypt.compare(
      questionAnswer.toLowerCase(),
      user.securityQuestionAnswer
    );

    if (!isRightAnswer) {
      return res
        .status(403)
        .json({ message: "Security question was answered incorrectly", success: false });
    }

    user.blocked = false;
    await user.save();

    res.status(200).json({ message: "Security question answered correctly", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

const signIn = async (req, res, next) => {
  const { user: userData, questionAnswer, verificationCode, password } = req.body;

  if (!questionAnswer && !verificationCode) {
    return res.status(400).json({
      message: "Answer to security question or verificationCode is missing in request body",
      success: false,
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is missing in request body",
      success: false,
    });
  }

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    if (user.blocked) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    if (verificationCode && verificationCode !== user.prevVerificationCode) {
      return res.status(403).json({ message: "Verification code is wrong", success: false });
    }

    if (questionAnswer) {
      const isRightAnswer = await bcrypt.compare(
        questionAnswer.toLowerCase(),
        user.securityQuestionAnswer
      );

      if (!isRightAnswer) {
        return res
          .status(403)
          .json({ message: "Security question was answered incorrectly", success: false });
      }
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

const verifySession = (req, res) => {
  const jwtToken = req.cookies.jwtToken;
  if (req.cookies.jwtToken) {
    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

      if (!decoded) {
        return res.status(401).json({
          message: "Unauthenticated",
          success: false,
        });
      }

      return res.status(200).json({ message: "Authenticated", success: true });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({
          message: "Your session has expired. Please sign in again.",
          success: false,
        });
      }
      return res.status(500).json({
        message: "An error occurred during authentication.",
        success: false,
      });
    }
  }

  res.status(401).json({ message: "Unauthenticated", success: false });
};

module.exports = {
  requestCode,
  verifyCode,
  validateQuestion,
  signIn,
  verifySession,
};
