const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const { sendEmailCode } = require("../services/emailService");
const {
  changeName,
  changeEmail,
  changePassword,
  changeSecurityQuestionAnswer,
  changeSecurityQuestion,
  getAppsByNames,
} = require("../services/userService");
const InvoiceModel = require("../models/Invocie");
const IssueModel = require("../models/Issue");
const AppModel = require("../models/App");

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
    const createdApps = await getAppsByNames(user.createdApps, user.name);
    const adminApps = await getAppsByNames(user.adminApps, user.name);
    const appConnections = await getAppsByNames(user.appConnections, user.name);

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

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

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

    const session = await UserModel.startSession();
    session.startTransaction();

    try {
      await IssueModel.findOneAndUpdate({ user: user.name }, { user: name }, { session });
      await InvoiceModel.updateMany({ to: user.name }, { to: name }, { session });
      await AppModel.updateMany({ creator: user.name }, { creator: name }, { session });
      const appEntries = await AppModel.find({ admins: user.name }, { admins: 1 }).session(session);
      const currentAdmins = appEntries.flatMap((entry) => entry.admins);
      await AppModel.updateMany(
        { admins: user.name },
        { $set: { admins: currentAdmins.map((admin) => (admin === user.name ? name : admin)) } },
        { session }
      );
      const updatedUser = await changeName(user.name, name);

      await session.commitTransaction();
      req.body.user = updatedUser;
      req.body.statusCode = 200;
      req.body.message = "Username updated successfully";
      req.body.rememberUser = rememberUser;

      next();
    } catch (error) {
      await session.abortTransaction();
      console.error(error);
      return res.status(500).json({ message: "Internal server error", success: false });
    } finally {
      session.endSession();
    }
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
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getInvoices = async (req, res) => {
  const name = req.user.name;

  try {
    const invoices = await InvoiceModel.find({ to: name });

    res.status(200).json({ message: "Invoices retrieved successfully", success: true, invoices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const markInvoiceAsRead = async (req, res) => {
  const { invoiceID } = req.body;

  try {
    const invoice = await InvoiceModel.findOne({ _id: invoiceID });

    if (!invoice) {
      return res.status(404).json({ message: "Invocie not found", success: false });
    }

    invoice.isRead = true;
    await invoice.save();

    res.status(200).json({ message: "Invoice marked as read successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteInvoice = async (req, res) => {
  const { invoiceID } = req.body;

  try {
    const deleteResult = await InvoiceModel.deleteOne({ _id: invoiceID });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "Invocie not found", success: false });
    }

    res.status(200).json({ message: "Invoice deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const reportIssue = async (req, res) => {
  const { issue, text } = req.body;
  const name = req.user.name;

  if (!issue) {
    return res.status(400).json({ message: "Name of issue is missing", success: false });
  }

  if (!text) {
    return res.status(400).json({ message: "Issue description is missing", success: false });
  }

  if (issue.length > 100) {
    return res
      .status(400)
      .json({ message: "Name of issue cannot be longer then 100 characters", success: false });
  }

  if (text.length > 500) {
    return res
      .status(400)
      .json({ message: "Issue description cannot be longer then 500 characters", success: false });
  }

  try {
    const existingIssue = await IssueModel.findOne({ user: name });

    if (existingIssue) {
      return res.status(400).json({
        message: "You have already reported an issue that remains unresolved.",
        success: false,
      });
    }

    const newIssue = new IssueModel({ issue, text, user: name });
    await newIssue.save();

    const newInvoice = new InvoiceModel({
      subject: "Issue Report Confirmation",
      to: name,
      from: "Authecho",
      text: `Dear ${name},\n\nWe wish to inform you that the issue you reported, titled "${issue}", has been duly acknowledged and is currently under review. Our team is thoroughly examining the matter to determine its underlying cause. Rest assured, we are committed to resolving this issue as swiftly as possible.\n\nOnce a resolution is reached, we will provide you with detailed information regarding the outcome of your report. We appreciate your patience and understanding during this process.\n\nThank you for bringing this matter to our attention.\n\nBest regards,\nThe Authecho Team`,
    });
    await newInvoice.save();

    return res
      .status(201)
      .json({ message: "Issue reported successfully", success: true, issue: newIssue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
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
  getInvoices,
  markInvoiceAsRead,
  deleteInvoice,
  reportIssue,
};
