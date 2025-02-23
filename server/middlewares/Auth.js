const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const UserModel = require("../models/User");
const AppModel = require("../models/App");
const { verifyTemplate } = require("../utils/emailTemplate");

require("dotenv").config();

const AUTHECHO_MASTER_API_KEY = process.env.AUTHECHO_MASTER_API_KEY;

const ensureAuthenticated = async (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).json({ message: "Please sign in to continue", success: false });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Unauthenticated", success: false });
    }

    const user = await UserModel.findOne({ name: decoded.name });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.isFrozen) {
      return res.status(403).json({ message: "Account is frozen", success: false });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Your session has expired. Please sign in again", success: false });
  }
};

const ensureAdmin = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;

  if (!jwtToken) {
    return res.status(401).json({ message: "Please sign in to continue", success: false });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const isAdmin = decoded.adminKey && decoded.adminKey === process.env.ADMIN_KEY;

    if (!isAdmin) {
      return res.status(403).json({ message: "Unauthenticated", success: false });
    }

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Your session has expired. Please sign in again", success: false });
  }
};

const sendEmail = async (recipientEmail, subject, text, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    html: verifyTemplate(subject, text, verificationCode),
    text: `${text}: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending verification email");
    return false;
  }
};

const ensureApiKey = (req, res, next) => {
  const apiKey = req.headers["authehco-master-api-key"];

  if (apiKey !== AUTHECHO_MASTER_API_KEY) {
    return res.status(403).json({ message: "Master Api key is wrong or missing", success: false });
  }

  next();
};

const verifyAppCredentials = async (req, res, next) => {
  const appName = req.headers["authecho-app-name"];
  const appKey = req.headers["authecho-app-key"];

  if (!appName) {
    return res.status(400).json({ message: "authecho-app-name header is missing", success: false });
  }

  if (!appKey) {
    return res.status(400).json({ message: "authecho-app-key header is missing", success: false });
  }

  try {
    const app = await AppModel.findOne({ name: appName }).collation({ locale: "en", strength: 1 });

    if (!app) {
      return res.status(404).json({ message: "App not found", success: true });
    }

    if (app.isFrozen) {
      return res.status(403).json({ message: "App isFrozen", success: true });
    }

    const requestOrigin = req.headers.origin;

    if (requestOrigin && requestOrigin !== app.origin) {
      return res
        .status(403)
        .json({ message: "Request origin does not match chosen app origin", success: false });
    }

    const isKeyEqual = await bcrypt.compare(appKey, app.key);

    if (!isKeyEqual) {
      return res.status(403).json({ message: "App key is wrong", success: false });
    }

    req.app = app;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const ensureUser = async (req, res, next) => {
  const { user: userData } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: userData }, { name: userData }],
    }).collation({ locale: "en", strength: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.isFrozen) {
      return res.status(403).json({ message: "Account is frozen", success: false });
    }

    if (user.suspended) {
      return res.status(403).json({ message: "Account is suspended", success: false });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Account is not verified", success: false });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

const ensureAuthenticatedByApp = async (req, res, next) => {
  const jwtToken = req.cookies.jwtAppToken;

  if (!jwtToken) {
    return res.status(401).json({ message: "Please sign in to continue", success: false });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_APP_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Unauthenticated", success: false });
    }

    const user = await UserModel.findOne({ name: decoded.name });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.isFrozen) {
      return res.status(403).json({ message: "Account is frozen", success: false });
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Your session has expired. Please sign in again", success: false });
  }
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
  sendEmail,
  ensureApiKey,
  verifyAppCredentials,
  ensureUser,
  ensureAuthenticatedByApp,
};
