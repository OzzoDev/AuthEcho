const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

const ensureAuthenticated = (req, res, next) => {
  const jwtToken = req.cookies.jwtToken;
  if (jwtToken) {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthenticated",
        success: false,
      });
    }

    next();
  }
  res.status(401).json({ message: "Unauthenticated", success: false });
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
