const AppModel = require("../models/App");
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
  const { user, deleteCommand } = req.body;

  try {
    const isDeleteConfirmed = deleteCommand.toLowerCase() === `delete ${user.toLowerCase()}`;

    if (!isDeleteConfirmed) {
      return res
        .status(400)
        .json({ message: "Deletion failed due to the absence of confirmation", success: false });
    }

    const userData = await UserModel.findOne({ name: user });

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const isAdmin = userData.adminKey;

    if (isAdmin) {
      return res.status(400).json({ message: "Cannot delete admin account", success: false });
    }

    await UserModel.deleteOne({ name: user });

    res.status(204).json({ message: "User deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const freezeAccount = async (req, res) => {
  const { user } = req.body;

  try {
    const userData = await UserModel.findOne({ name: user });

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

    res.status(200).json({ message, status: true });
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

    await AppModel.deleteOne({ name: app });

    res.status(204).json({ message: "App deleted successfully", success: true });
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

    res.status(200).json({ message, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteIssue = async (req, res) => {
  const { issueID } = req.body;

  try {
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

    res.status(200).json({ message, status: true });
  } catch (error) {
    console.error(error);
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
};
