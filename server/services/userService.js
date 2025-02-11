const bcrypt = require("bcrypt");
const User = require("../models/User");
const AppModel = require("../models/App");

const findUser = async (identifier) => {
  return await User.findOne({
    $or: [{ email: identifier }, { name: identifier }],
  }).collation({ locale: "en", strength: 1 });
};

const changeName = async (identifier, name) => {
  const user = await findUser(identifier);
  if (user) {
    user.name = name;
    await user.save();
    return user;
  }
};

const changeEmail = async (identifier, email) => {
  const user = await findUser(identifier);
  if (user) {
    user.email = email;
    await user.save();
    return user;
  }
};

const changePassword = async (identifier, password) => {
  const user = await findUser(identifier);
  if (user) {
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    return user;
  }
};

const changeSecurityQuestion = async (identifier, securityQuestion) => {
  const user = await findUser(identifier);
  if (user) {
    user.securityQuestion = securityQuestion;
    await user.save();
    return user;
  }
};

const changeSecurityQuestionAnswer = async (identifier, securityQuestionAnswer) => {
  const user = await findUser(identifier);
  if (user) {
    user.securityQuestionAnswer = await bcrypt.hash(securityQuestionAnswer, 10);
    await user.save();
    return user;
  }
};

const addCreatedApp = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.createdApps.addToSet(app);
    await user.save();
    return user;
  }
};

const addAdminApp = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.adminApps.addToSet(app);
    await user.save();
    return user;
  }
};

const addAppConnection = async (identifier, app) => {
  const user = await findUser(identifier);
  if (user) {
    user.appConnections.addToSet(app);
    await user.save();
    return user;
  }
};

const getAppsByNames = async (namesArray) => {
  try {
    const promises = namesArray.map(async (name) => {
      const apps = await AppModel.findOne({ name: name });
      return apps;
    });

    const results = await Promise.all(promises);

    const foundApps = results
      .filter((res) => res)
      .map((app) => ({
        name: app.name,
        origin: app.origin,
        description: app.description,
        creator: app.creator,
        admins: app.admins,
      }));
    return foundApps;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  changeName,
  changeEmail,
  changePassword,
  changeSecurityQuestion,
  changeSecurityQuestionAnswer,
  addCreatedApp,
  addAdminApp,
  addAppConnection,
  getAppsByNames,
};
