const AppModel = require("../models/App");
const { removeAllWhitespaces } = require("../utils/utils");

const findApp = async (identifier) => {
  return await AppModel.findOne({ name: identifier }).collation({ locale: "en", strength: 1 });
};

const updateAppName = async (identifier, appName) => {
  const app = await findApp(identifier);

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

  if (app) {
    if (app.status === appStatus) {
      return null;
    }

    app.status = appStatus;
    await app.save();

    return true;
  }
  return null;
};

const updateAppAdmins = async (identifier, appAdmins) => {
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

    app.admins = appAdmins;
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

    app.resources = appResources;
    await app.save();

    return true;
  }
  return null;
};

module.exports = {
  updateAppName,
  updateAppOrigin,
  updateAppDesription,
  updateAppStatus,
  updateAppAdmins,
  updateAppResources,
};
