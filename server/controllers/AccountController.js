const UserModel = require("../models/User");

const REMEMBER_USER_KEY = "rememberUser";

const accountOverview = async (req, res) => {
  const userData = req.user;
  const rememberUser = req.cookies[REMEMBER_USER_KEY];

  try {
    const user = await UserModel.findOne({ email: userData.email });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const lastLogin = user.lastLogin;
    const createdAt = user.createdAt;
    const isRemembered = rememberUser ? true : false;
    const createdApps = user.createdApps;
    const adminApps = user.adminApps;
    const appConnections = user.appConnections;

    res
      .status(200)
      .json({
        message: "Success",
        success: true,
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

module.exports = {
  accountOverview,
};
