const ActivityLogModel = require("../models/ActivityLog");

const getActivityToday = async () => {
  try {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const logs = await ActivityLogModel.find(
      { appName: "Authecho", date: todayString },
      {
        _id: 0,
        appName: 0,
      }
    ).sort({ date: 1 });

    const userCount = logs && logs.length !== 0 ? logs[0].userCount : 0;
    return userCount;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getActivityToday,
};
