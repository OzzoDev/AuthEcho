const UserModel = require("../models/User");
const { getDate } = require("../utils/utils");

const trackUser = async (req, res) => {
  const { user } = req.body;

  const name = user.name;
  const email = user.email;

  if (!name) {
    return res.status(400).json({ message: "Name is missing", success: false });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is missing", success: false });
  }

  try {
    //*Add mongodb uri in server/.env to interact with your database
    // const userInDb = await UserModel.findOne({
    //   $or: [{ email }, { name }],
    // });

    //*Add mongodb uri in server/.env to interact with your database
    // if (userInDb) {
    //   userInDb.lastLogin = getDate();
    //   await userInDb.save();
    //   return res.status(200).json({ message: "User is already tracked", success: true });
    // }

    //*Add mongodb uri in server/.env to interact with your database
    // const newUser = new UserModel({ name, email });
    // await newUser.save();

    res.status(201).json({ message: "Tracking user successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = { trackUser };
