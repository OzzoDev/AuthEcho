const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivityLogSchema = new Schema({
  appName: { type: String, required: true, index: true },
  date: { type: String, required: true, index: true },
  userCount: { type: Number, default: 0 },
  users: { type: [String], default: [] },
});

ActivityLogSchema.index({ appName: 1, date: 1 }, { unique: true });

const ActivityLogModel = mongoose.model("activity", ActivityLogSchema);

module.exports = ActivityLogModel;
