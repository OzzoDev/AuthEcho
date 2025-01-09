const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ message: "Access denied. Please log in to continue." });
  }

  const credentials = auth.split(" ")[1];

  if (!credentials) {
    return res.status(403).json({ message: "Access denied. Please provide your login credentials." });
  }

  try {
    const decoded = jwt.verify(credentials, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Access denied. Your session has expired or is invalid. Please log in again." });
  }
};

const sendEmail = async (recipientEmail, subject, text) => {
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
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending verification email");
    return false;
  }
};

module.exports = {
  ensureAuthenticated,
  sendEmail,
};
