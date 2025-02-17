const crypto = require("crypto");

const hex8BitKey = () => {
  return crypto.randomBytes(4).toString("hex").slice(0, 8);
};

const hex32BitKey = () => {
  return crypto.randomBytes(32).toString("hex").slice(0, 32);
};

const hex64BitKey = () => {
  return crypto.randomBytes(64).toString("hex").slice(0, 64);
};

const hex128BitKey = () => {
  return crypto.randomBytes(128).toString("hex").slice(0, 128);
};

module.exports = {
  hex8BitKey,
  hex32BitKey,
  hex64BitKey,
  hex128BitKey,
};
