const bcrypt = require("bcrypt");
const User = require("../models/User");

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

module.exports = {
  changeName,
  changeEmail,
  changePassword,
  changeSecurityQuestion,
  changeSecurityQuestionAnswer,
  addCreatedApp,
  addAdminApp,
  addAppConnection,
};
