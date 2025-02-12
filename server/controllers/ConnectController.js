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
const {
  updateAppName,
  updateAppOrigin,
  updateAppDesription,
  updateAppStatus,
  updateAppAdmins,
  updateAppResources,
} = require("../services/appService");

const joinApp = async (req, res) => {
  const { appName, origin, admins, resources, appDescription } = req.body;
  const userData = req.user;

  if (!appName) {
    return res.status(400).json({ message: "App name is not provided", success: false });
  }

  if (!origin) {
    return res.status(400).json({ message: "App origin is not provided", success: false });
  }

  if (appName.length > 100) {
    return res.status(400).json({
      message: "The application name exceeds the maximum allowed length of 300 characters",
      success: false,
    });
  }

  if (appDescription && appDescription.length > 300) {
    return res.status(400).json({
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

    const appNames = await AppModel.find();

    const normalizedAppNameCheck = appNames.some(
      (app) =>
        removeAllWhitespaces(app.name.toLowerCase()) === removeAllWhitespaces(appName.toLowerCase())
    );

    if (normalizedAppNameCheck) {
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

    await Promise.all([
      addCreatedApp(user.name, appName),
      addAdminApp(user.name, appName),
      addAppConnection(user.name, appName),
    ]);

    res
      .status(201)
      .json({ message: "Successfully joined app", success: true, appKey: key, appName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const editApp = async (res, res) => {
  const { app, appName, origin, admins, resources, appDescription, status } = req.body;

  if (!app) {
    return res.status(400).json({ message: "App is not provided", success: false });
  }

  try {
    const app = await AppModel.findOne({ name: app });

    if (!app) {
      res.status(400).json({ message: "App not found", success: false });
    }

    const identifier = app.name;

    await Promise.all([
      updateAppName(identifier, appName),
      updateAppOrigin(identifier, origin),
      updateAppDesription(identifier, appDescription),
      updateAppStatus(identifier, status),
      updateAppAdmins(identifier, admins),
      updateAppResources(identifier, resources),
    ]);

    res.status(200).json({ message: "App updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteApp = async (req, res) => {
  const { app, deleteCommand } = req.body;

  if (!app) {
    return res.status(400).json({ message: "App is not provided", success: false });
  }

  try {
    const isDeleteConfirmed = deleteCommand.toLowerCase() === `delete ${app.toLowerCase()}`;

    if (!isDeleteConfirmed) {
      return res
        .status(400)
        .json({ message: "Deletion failed due to the absence of confirmation", success: false });
    }

    const deleteResult = await AppModel.deleteOne({ name: app });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    res.status(200).json({ message: "App deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const generateAppKey = async (req, res) => {
  const { app } = req.body;

  if (!app) {
    return res.status(400).json({ message: "App is not provided", success: false });
  }

  try {
    const targetApp = await AppModel.findOne({ name: app });

    if (!targetApp) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    const key = hex32BitKey();
    targetApp.key = key;

    targetApp.key = await bcrypt.hash(key, 10);
    await targetApp.save();

    res.status(200).json({ message: "App key updated successfully", success: true, appKey: key });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  joinApp,
  editApp,
  deleteApp,
  generateAppKey,
};
