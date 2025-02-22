const AppModel = require("../models/App");
const UserModel = require("../models/User");
const { removeAllWhitespaces, decapitalize } = require("../utils/utils");
const { findUser } = require("./userService");

const findApp = async (identifier) => {
  return await AppModel.findOne({ name: identifier }).collation({ locale: "en", strength: 1 });
};

const updateAppName = async (identifier, appName, userData) => {
  const user = await findUser(userData);
  const app = await findApp(identifier);

  if (!user) {
    return null;
  }

  if (!appName) {
    return null;
  }

  if (app) {
    if (appName.length > 100) {
      return null;
    }

    const appNameExists = await AppModel.findOne({ name: appName }).collation({
      locale: "en",
      strength: 1,
    });

    if (appNameExists) {
      return null;
    }

    const appNames = await AppModel.find();

    const normalizedAppNameCheck = appNames.some(
      (app) =>
        removeAllWhitespaces(app.name.toLowerCase()) === removeAllWhitespaces(appName.toLowerCase())
    );

    if (normalizedAppNameCheck) {
      return null;
    }

    if (app.name === appName) {
      return null;
    }

    const apps = user.createdApps;
    const updatedApps = apps.map((appItem) => {
      if (appItem === app.name) {
        return appName;
      }
      return appItem;
    });

    user.createdApps = updatedApps;
    await user.save();

    app.name = appName;
    await app.save();

    return true;
  }
  return null;
};

const updateAppOrigin = async (identifier, appOrigin, apps) => {
  const app = await findApp(identifier);

  if (!appOrigin) {
    return null;
  }

  if (app) {
    const originAlredyConnectByUser = apps.some(
      (appItem) => appItem.origin === removeAllWhitespaces(appOrigin.toLowerCase())
    );

    if (originAlredyConnectByUser) {
      return null;
    }

    if (app.origin === appOrigin) {
      return null;
    }

    app.origin = appOrigin;
    await app.save();

    return true;
  }
  return null;
};

const updateAppDesription = async (identifier, appDescription) => {
  const app = await findApp(identifier);

  if (!appDescription) {
    return null;
  }

  if (app) {
    if (appDescription.length > 300) {
      return null;
    }

    if (app.description === appDescription) {
      return null;
    }

    app.description = appDescription;
    await app.save();

    return true;
  }
  return null;
};

const updateAppStatus = async (identifier, appStatus) => {
  const app = await findApp(identifier);

  if (!appStatus) {
    return null;
  }

  const normalizedStatus = decapitalize(appStatus);

  if (app) {
    if (app.status === normalizedStatus) {
      return null;
    }

    app.status = normalizedStatus;
    await app.save();

    return true;
  }
  return null;
};

const updateAppAdmins = async (identifier, appAdmins, username) => {
  const app = await findApp(identifier);

  if (!appAdmins) {
    return null;
  }

  if (app) {
    const isAdminEqual =
      app.admins.length === appAdmins.length &&
      [...new Set([...app.admins])].every((value) => appAdmins.includes(value));

    if (isAdminEqual) {
      return null;
    }

    const usersLostAccess = app.admins.filter((admin) => !appAdmins.includes(admin));

    if (usersLostAccess.length > 0) {
      await UserModel.updateMany(
        { name: { $in: usersLostAccess } },
        { $pull: { adminApps: app.name } }
      );
    }

    const allUsers = await Promise.all(
      [...appAdmins].map((appAdmin) => UserModel.findOne({ name: appAdmin }))
    );

    const validUsers = allUsers.filter((user) => user);

    if (validUsers.length > 0) {
      await UserModel.updateMany(
        { name: { $in: appAdmins } },
        { $addToSet: { adminApps: app.name } }
      );
    }

    app.admins = appAdmins.filter((admin) => admin !== username);
    await app.save();

    return true;
  }
  return null;
};

const updateAppResources = async (identifier, appResources) => {
  const app = await findApp(identifier);

  if (!appResources) {
    return null;
  }

  if (app) {
    const isResourceEqual = (res1, res2) => {
      return (
        res1.id === res2.id &&
        res1.name === res2.name &&
        res1.resource === res2.resource &&
        res1.visibility === res2.visibility
      );
    };

    const isResourcesEqual =
      app.resources.length === appResources.length &&
      app.resources.every((res, index) => {
        return isResourceEqual(res, appResources[index]);
      });

    if (isResourcesEqual) {
      return null;
    }

    const filteredResources = appResources.filter((res) => res.name !== "" && res.resource !== "");

    app.resources = filteredResources;
    await app.save();

    return true;
  }
  return null;
};

const getApps = async () => {
  try {
    const apps = await AppModel.find();
    return apps;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateAppName,
  updateAppOrigin,
  updateAppDesription,
  updateAppStatus,
  updateAppAdmins,
  updateAppResources,
  getApps,
};
