function getEmailText(action, name) {
  switch (action) {
    case "verifyEmail":
      return `Hello ${name}! Here is the verification code to verify your email`;
    case "verifyAccess":
      return `Hello ${name}! Here is the verification code to verify access to your account`;
    case "verifyPassword":
      return `Hello ${name}! Here is the verification code to reset your password`;
    case "unlockAccount":
      return `Hello ${name}! Here is the verification code to unlock your account `;
    default:
      break;
  }
}

module.exports = {
  getEmailText,
};
