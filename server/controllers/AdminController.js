const ActivityLogModel = require("../models/ActivityLog");
const AppModel = require("../models/App");
const InvoiceModel = require("../models/Invocie");
const IssueModel = require("../models/Issue");
const UserModel = require("../models/User");
const { getActivityToday } = require("../services/activityService");
const { getApps } = require("../services/appService");
const { getIssues } = require("../services/issueService");
const { getUsers } = require("../services/userService");

const getOverview = async (_, res) => {
  try {
    const users = await getUsers();
    const apps = await getApps();
    const issues = await getIssues();
    const userCountToday = await getActivityToday();

    const unResolvedIssues = issues.filter((issue) => !issue.isResolved).length;

    return res.status(200).json({
      message: "Overview fetched successfully",
      success: true,
      users,
      apps,
      issues,
      unResolvedIssues,
      userCountToday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteUser = async (req, res) => {
  const { username, deleteCommand } = req.body;

  try {
    const isDeleteConfirmed = deleteCommand.toLowerCase() === `delete ${username.toLowerCase()}`;

    if (!isDeleteConfirmed) {
      return res
        .status(400)
        .json({ message: "Deletion failed due to the absence of confirmation", success: false });
    }

    const userData = await UserModel.findOne({ name: username });

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isAdmin = userData.adminKey;

    if (isAdmin) {
      return res.status(400).json({ message: "Cannot delete admin account", success: false });
    }

    await UserModel.deleteOne({ name: username });

    const users = await getUsers();

    res.status(200).json({ message: "User deleted successfully", success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const freezeAccount = async (req, res) => {
  const { username } = req.body;

  try {
    const userData = await UserModel.findOne({ name: username });

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isAdmin = userData.adminKey;

    if (isAdmin) {
      return res.status(400).json({ message: "Cannot freeze admin account", success: false });
    }

    const isFrozen = userData.isFrozen;
    const message = isFrozen ? "Account unfrozen successfully" : "Account frozen successfully";

    userData.isFrozen = !isFrozen;
    await userData.save();

    let newInvoice;

    if (isFrozen) {
      newInvoice = new InvoiceModel({
        subject: "Account Access Notification",
        to: username,
        from: "Authecho",
        text: `Dear ${username},\n\nWe are pleased to inform you that you have successfully regained access to your account. The issue previously reported regarding your account has been thoroughly investigated and resolved. We appreciate your patience during this process and are committed to ensuring the security of your account.\n\nBest regards,\nThe Authecho Team`,
      });
    } else {
      newInvoice = new InvoiceModel({
        subject: "Account Access Notification",
        to: username,
        from: "Authecho",
        text: `Dear ${username},\n\nWe wish to formally inform you that your account has been temporarily frozen due to suspicious activity that may indicate unauthorized access. As we conduct a thorough investigation into this matter, you will regrettably be unable to access your account during this period. We appreciate your understanding and patience as we work to resolve this issue promptly.\n\nBest regards,\nThe Authecho Team`,
      });
    }

    await newInvoice.save();

    const users = await getUsers();

    res.status(200).json({ message, success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteApp = async (req, res) => {
  const { app, deleteCommand } = req.body;

  try {
    const isDeleteConfirmed = deleteCommand.toLowerCase() === `delete ${app.toLowerCase()}`;

    if (!isDeleteConfirmed) {
      return res
        .status(400)
        .json({ message: "Deletion failed due to the absence of confirmation", success: false });
    }

    const appData = await AppModel.findOne({ name: app });

    if (!appData) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    await AppModel.deleteOne({ name: app });

    const newInvoice = new InvoiceModel({
      subject: "Application Deletion Notification",
      to: appData.creator,
      from: "Authecho",
      text: `Dear ${appData.creator},\n\nWe regret to inform you that the application named "${app}" has been permanently removed from our database. This action may have been taken due to consistently low activity associated with your application; however, it is more likely a result of the usage of access controls that do not align with our policies. We encourage you to review our guidelines to ensure compliance for future applications.\n\nThank you for your understanding.\n\nBest regards,\nThe Authecho Team`,
    });

    await newInvoice.save();

    const apps = await getApps();

    res.status(200).json({ message: "App deleted successfully", success: true, apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const freezeApp = async (req, res) => {
  const { app } = req.body;

  try {
    const appData = await AppModel.findOne({ name: app });

    if (!appData) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    const isFrozen = appData.isFrozen;
    const message = isFrozen ? "App unfrozen successfully" : "App frozen successfully";

    appData.isFrozen = !isFrozen;
    await appData.save();

    let newInvoice;

    if (isFrozen) {
      newInvoice = new InvoiceModel({
        subject: "Application Access Notification",
        to: appData.creator,
        from: "Authecho",
        text: `Dear ${appData.creator},\n\nWe are pleased to inform you that you have successfully regained access to your application, "${app}". This restoration follows a thorough investigation into the reasons behind the temporary suspension of access. We appreciate your patience during this process and are committed to ensuring the security of your application.\n\nBest regards,\nThe Authecho Team`,
      });
    } else {
      newInvoice = new InvoiceModel({
        subject: "Application Access Notification",
        to: appData.creator,
        from: "Authecho",
        text: `Dear ${appData.creator},\n\nWe regret to inform you that access to an application connected to Authecho has been temporarily suspended. This action may be due to suspicious activity related to your application or a vulnerability identified in its security. We are actively investigating this matter and recommend reviewing your application for any potential issues.\n\nThank you for your understanding.\n\nBest regards,\nThe Authecho Team`,
      });
    }

    await newInvoice.save();

    const apps = await getApps();

    res.status(200).json({ message, status: true, apps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteIssue = async (req, res) => {
  const { issueID } = req.body;

  try {
    const issueData = await IssueModel.findOne({ _id: issueID });

    if (!issueData) {
      return res.status(404).json({ message: "Issue not found", success: false });
    }

    if (!issueData.isResolved) {
      return res.status(400).json({ message: "Issue is not resolved", success: false });
    }

    await IssueModel.deleteOne({ _id: issueID });

    res.status(204).json({ message: "Issue deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const resolveIssue = async (req, res) => {
  const { issueID } = req.body;

  try {
    const issueData = await IssueModel.findOne({ _id: issueID });

    if (!issueData) {
      return res.status(404).json({ message: "Issue not found", success: false });
    }

    const isResolved = issueData.isResolved;
    const message = isResolved ? "Issue resolved successfully" : "Issue unresolved successfully";

    issueData.isResolved = !isResolved;
    await issueData.save();

    let newInvoice;

    if (isResolved) {
      newInvoice = new InvoiceModel({
        subject: "Issue Unresolved Notification",
        to: issueData.user,
        from: "Authecho",
        text: `Dear ${issueData.user},\n\nWe regret to inform you that, despite our diligent efforts, we have not yet been able to reach a resolution regarding the issue you previously reported. Please rest assured that our team is actively working on this matter, and we sincerely appreciate your patience and understanding during this process.\n\nFor your reference, the issue pertains to: "${issueData.issue}".\n\nThank you for your continued understanding and support.\n\nBest regards,\nThe Authecho Team`,
      });
    } else {
      newInvoice = new InvoiceModel({
        subject: "Issue Resolved Notification",
        to: issueData.user,
        from: "Authecho",
        text: `Dear ${issueData.user},\n\nWe are pleased to inform you that the issue you reported has now been successfully resolved. Following a thorough investigation, we can confidently assure you that the problem no longer persists. We greatly appreciate your efforts in bringing this matter to our attention, as your feedback is invaluable in helping us enhance your experience with Authecho.\n\nFor your reference, the issue pertains to: "${issueData.issue}".\n\nThank you for your understanding and support.\n\nBest regards,\nThe Authecho Team`,
      });
    }

    await newInvoice.save();

    const issues = await getIssues();

    res.status(200).json({ message, status: true, issue: issueData, issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const appActivity = async (req, res) => {
  const { days } = req.body;

  let query = { appName: "Authecho" };

  const defaultDays = days === 0 || days === 1 ? 2 : days || 30;

  if (days !== -1) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - defaultDays);
    const fromDateString = fromDate.toISOString().split("T")[0];

    query.date = { $gte: fromDateString };
  }

  try {
    const logs = await ActivityLogModel.find(query, {
      _id: 0,
      appName: 0,
    }).sort({ date: 1 });

    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error("Error retrieving activity logs:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  getOverview,
  deleteUser,
  freezeAccount,
  deleteApp,
  freezeApp,
  deleteIssue,
  resolveIssue,
  appActivity,
};
