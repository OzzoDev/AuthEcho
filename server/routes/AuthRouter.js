const {
  signup,
  signin,
  sendVerificationcode,
  resetPassword,
  verifyAccount,
  validatePassword,
  validateEmail,
  unlockAccount,
  isSuspended,
  getSecurityQuestions,
  setSecurityQuestion,
  validateSecurityQuestion,
  getUserSecurityQuestion,
  requestUnlockCode,
  getUserAlias,
} = require("../controllers/AuthController");
const {
  newAccountValidation,
  emailValidation,
  passwordResetValidation,
  ensureVerificationCode,
  ensureSecurityQuestion,
} = require("../middlewares/AuthValidation");
const { setCookies, verifyAuthentication } = require("../middlewares/Cookies");

const router = require("express").Router();

router.get("/verifyauthentication", verifyAuthentication);
router.get("/useralias", getUserAlias);
router.post("/signup", newAccountValidation, signup);
router.post("/signin", ensureVerificationCode, signin, setCookies);
router.post("/verifyaccount", verifyAccount);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/requestunlockcode", requestUnlockCode);
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
