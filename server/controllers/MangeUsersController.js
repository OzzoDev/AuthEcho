const UserModel = require("../models/User");

const getUsers = async (_, res) => {
  try {
    // const users = await UserModel;

    console.log("Requesting users...");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  getUsers,
};
