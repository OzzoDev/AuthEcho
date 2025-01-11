function getEmailText(action, name) {
  switch (action) {
    case "verifyEmail":
      return `Hello ${name}! Here is the verification code to confirm your new email:`;
    case "verifyPassword":
      return `Hello ${name}! Here is the verification code to reset your password:`;
    case "unlockAccount":
      return `Hello ${name}! Here is the verification code to unlock your account`;
    default:
      break;
  }
}

module.exports = {
  getEmailText,
};
