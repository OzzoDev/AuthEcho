const ActivityLogModel = require("../models/ActivityLog");
const ReviewModel = require("../models/Review");
const UserModel = require("../models/User");

const trackActivity = async (req, res) => {
  const username = req.user.name;
  const today = new Date().toISOString().split("T")[0];

  try {
    const user = await UserModel.findOne({ name: username });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.adminKey) {
      return res.status(400).json({ message: "Cannot track activity for admin", success: false });
    }

    const result = await ActivityLogModel.updateOne(
      { appName: "Authecho", date: today },
      {
        $addToSet: { users: user._id },
      },
      { upsert: true }
    );

    const message =
      result.modifiedCount > 0 ? "User added to app's activity log" : "User already tracked today";

    res.status(200).json({ message, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getTopReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ rating: { $gte: 3 } })
      .sort({ rating: -1 })
      .limit(6);

    res.status(200).json({ message: "Reviews retrieved successfully", success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  trackActivity,
  getTopReviews,
};
