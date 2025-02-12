function removeAllWhitespaces(str) {
  return str.replace(/\s+/g, "");
}

function decapitalize(str) {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

module.exports = {
  removeAllWhitespaces,
  decapitalize,
};
