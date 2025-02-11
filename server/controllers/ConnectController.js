const bcrypt = require("bcrypt");
const AppModel = require("../models/App");
const { hex32BitKey } = require("../utils/crypto");
const { addCreatedApp, addAdminApp, addAppConnection } = require("../services/userService");

const join = async (req, res) => {
  const { appName, origin, creator, admins, resources, appDescription } = req.body;
  const user = req.user;

  console.log(req.body);

  if (!appName) {
    return res.status(400).json({ message: "App name is not provided", success: false });
  }

  if (!origin) {
    return res.status(400).json({ message: "App origin is not provided", success: false });
  }

  if (!creator) {
    return res.status(400).json({ message: "App creator is not provided", success: false });
  }

  try {
    const appNameExists = await AppModel.findOne({ name: appName }).collation({
      locale: "en",
      strength: 1,
    });

    if (appNameExists) {
      return res.status(409).json({ message: "App name already exists", success: false });
    }

    const key = hex32BitKey();

    const appModel = new AppModel({
      name: appName,
      origin,
      creator,
      admins: [...admins, creator],
      resources,
      description: appDescription ? appDescription : "",
      key,
    });

    appModel.key = await bcrypt.hash(key, 10);
    await appModel.save();

    await addCreatedApp(user.name, appName);
    await addAdminApp(user.name, appName);
    await addAppConnection(user.name, appName);

    res
      .status(201)
      .json({ message: "Successfully joined app", success: true, appKey: key, appName });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
    console.error(error);
  }
};

module.exports = {
  join,
};
