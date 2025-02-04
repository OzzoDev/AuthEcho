const User = require("../models/User");

const findUser = async (identifier) => {
  return await User.findOne({
    $or: [{ email: identifier }, { name: identifier }],
  });
};

const addCreatedApp = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.createdApps.addToSet(app);
    await user.save();
  }
};

const addAdminApp = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.adminApps.addToSet(app);
    await user.save();
  }
};

const addAppConnection = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.appConnections.addToSet(app);
    await user.save();
  }
};

module.exports = {
  addCreatedApp,
  addAdminApp,
  addAppConnection,
};
