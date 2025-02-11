const bcrypt = require("bcrypt");
const AppModel = require("../models/App");
const UserModel = require("../models/User");
const { hex32BitKey } = require("../utils/crypto");
const {
  addCreatedApp,
  addAdminApp,
  addAppConnection,
  getAppsByNames,
} = require("../services/userService");
const { removeAllWhitespaces } = require("../utils/utils");

const join = async (req, res) => {
  const { appName, origin, admins, resources, appDescription } = req.body;
  const userData = req.user;

  if (!appName) {
    return res.status(400).json({ message: "App name is not provided", success: false });
  }

  if (!origin) {
    return res.status(400).json({ message: "App origin is not provided", success: false });
  }

  if (appDescription && appDescription.length > 300) {
    return res
      .status(400)
      .json({
        message: "The application description exceeds the maximum allowed length of 300 characters",
        success: false,
      });
  }

  try {
    const appNameExists = await AppModel.findOne({ name: appName }).collation({
      locale: "en",
      strength: 1,
    });

    if (appNameExists) {
      return res.status(409).json({ message: "App name already exists", success: false });
    }

    const user = await UserModel.findOne({ email: userData.email }).collation({
      locale: "en",
      strength: 1,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const createdApps = await getAppsByNames(user.createdApps);

    const originAlredyConnectByUser = createdApps.some(
      (app) => app.origin === removeAllWhitespaces(origin.toLowerCase())
    );

    if (originAlredyConnectByUser) {
      return res.status(400).json({
        message: "It is not permissible to have two applications on the same origin",
        success: false,
      });
    }

    const creator = userData.name;
    const key = hex32BitKey();

    const appModel = new AppModel({
      name: appName,
      origin: removeAllWhitespaces(origin.toLowerCase()),
      creator,
      admins: [...admins.slice(0, 10), creator],
      resources: resources.slice(0, 10),
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
