const {
  signup,
  signin,
  updateEmail,
  updateUsername,
  sendVerificationcode,
  resetPassword,
  verifyAccount,
  validatePassword,
  validateEmail,
  updatePassword,
  unlockAccount,
  isSuspended,
  getSecurityQuestions,
  setSecurityQuestion,
  validateSecurityQuestion,
  getUserSecurityQuestion,
  requestUnlockCode,
} = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const {
  newAccountValidation,
  emailValidation,
  usernameValidation,
  passwordResetValidation,
  ensureVerificationCode,
  ensureSecurityQuestion,
} = require("../middlewares/AuthValidation");
const { setCookies, verifyAuthentication } = require("../middlewares/Cookies");

const router = require("express").Router();

router.get("/verifyauthentication", verifyAuthentication);
router.post("/signup", newAccountValidation, signup);
router.post("/signin", ensureVerificationCode, signin, setCookies);
router.post("/verifyaccount", verifyAccount);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/requestunlockcode", requestUnlockCode);
router.put("/updateemail", ensureAuthenticated, updateEmail, setCookies);
router.put("/updateusername", ensureAuthenticated, usernameValidation, updateUsername, setCookies);
router.put("/updatepassword", ensureAuthenticated, updatePassword, setCookies);
router.post("/validateemail", emailValidation, validateEmail);
router.post("/validatepassword", validatePassword);
router.post(
  "/resetpassword",
  ensureVerificationCode,
  ensureSecurityQuestion,
  passwordResetValidation,
  resetPassword,
  setCookies
);
router.post("/unlockaccount", ensureVerificationCode, ensureSecurityQuestion, unlockAccount);
router.post("/issuspended", isSuspended);
router.get("/securityquestions", getSecurityQuestions);
router.post(
  "/setsecurityquestion",
  ensureVerificationCode,
  newAccountValidation,
  setSecurityQuestion,
  setCookies
);
router.post("/getusersecurityquestion", getUserSecurityQuestion);
router.post("/validatesecurityquestion", validateSecurityQuestion);

module.exports = router;
