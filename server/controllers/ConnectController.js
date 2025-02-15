const bcrypt = require("bcrypt");
const AppModel = require("../models/App");
const UserModel = require("../models/User");
const { hex32BitKey } = require("../utils/crypto");
const { addCreatedApp, getAppsByNames } = require("../services/userService");
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
      admins: [...admins.slice(0, 10)],
      resources: resources.slice(0, 10),
      description: appDescription ? appDescription : "",
      key,
    });

    appModel.key = await bcrypt.hash(key, 10);
    await appModel.save();

    await addCreatedApp(user.name, appName);

    res
      .status(201)
      .json({ message: "Successfully joined app", success: true, appKey: key, appName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const updateApp = async (req, res) => {
  const { app, appName, origin, admins, resources, appDescription, status } = req.body;
  const user = req.user;

  if (!app) {
    return res.status(400).json({ message: "App is not provided", success: false });
  }

  try {
    const userData = await UserModel.findOne({ name: user.name });

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const targetApp = await AppModel.findOne({ name: app });

    if (!targetApp) {
      res.status(400).json({ message: "App not found", success: false });
    }

    const isAppCreator = user.name === targetApp.creator;
    const isAppAdmin = targetApp.admins.includes(user.name);

    if (!isAppCreator && !isAppAdmin) {
      return res
        .status(403)
        .json({ message: "Only app creator or app admin can edit app", success: false });
    }

    const identifier = targetApp.name;
    const allCreatorApps = await getAppsByNames(userData.createdApps);

    await Promise.all([
      updateAppName(identifier, appName, user.name),
      updateAppOrigin(identifier, origin, allCreatorApps),
      updateAppDesription(identifier, appDescription),
      updateAppStatus(identifier, status),
      updateAppResources(identifier, resources),
    ]);

    if (!isAppCreator) {
      return res
        .status(404)
        .json({ message: "Only app creator can change app admins", success: false });
    }

    await updateAppAdmins(identifier, admins, user.name);

    res.status(200).json({ message: "App updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const deleteApp = async (req, res) => {
  const { app, deleteCommand } = req.body;
  const user = req.user;

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

    const userData = await UserModel.findOne({ name: user.name });

    if (!userData) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const targetApp = await AppModel.findOne({ name: app });

    if (!targetApp) {
      return res.status(404).json({ message: "App not found", success: false });
    }

    const isAppCreator = user.name === app.creator;

    if (!isAppCreator) {
      return res.status(404).json({ message: "Only app creator can delete app", success: false });
    }

    const filteredCreatedApps = userData.createdApps.filter((appItem) => appItem !== app);

    userData.createdApps = filteredCreatedApps;
    await userData.save();

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
  updateApp,
  deleteApp,
  generateAppKey,
};
