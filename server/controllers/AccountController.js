const UserModel = require("../models/User");

const accountOverview = async (req, res) => {
  const userData = req.user;
  try {
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const lastLogin = user.lastLogin;
    const createdAt = user.createdAt;

    res.status(200).json({ message: "Success", success: true, createdAt, lastLogin });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  accountOverview,
};
