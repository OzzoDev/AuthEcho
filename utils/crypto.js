const crypto = require("crypto");

const hex8BitKey = () => {
  return crypto.randomBytes(8).toString("hex");
};

const hex32BitKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const hex64BitKey = () => {
  return crypto.randomBytes(34).toString("hex");
};

module.exports = {
  hex8BitKey,
  hex32BitKey,
  hex64BitKey,
};
