const IssueModel = require("../models/Issue");

const getIssues = async () => {
  try {
    const issues = await IssueModel.find();
    return issues;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getIssues,
};
