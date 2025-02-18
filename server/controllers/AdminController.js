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
    console.error("Error retrieving activity logs:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  getOverview,
};
