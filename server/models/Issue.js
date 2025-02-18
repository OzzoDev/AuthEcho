const mongoose = require("mongoose");
const { getDate } = require("../utils/date");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  sentAt: {
    type: String,
    default: getDate(),
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
});

const IssueModel = mongoose.model("issues", IssueSchema);

module.exports = IssueModel;
