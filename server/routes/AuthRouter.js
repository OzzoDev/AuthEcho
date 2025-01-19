const {
  signup,
  signin,
  updateEmail,
  updateUsername,
  sendVerificationcode,
  resetPassword,
  verifyAccount,
  validatePassword,
  getUserData,
  validateEmail,
  updatePassword,
  unlockAccount,
  isSuspended,
  getSecurityQuestions,
  setSecurityQuestion,
  validateSecurityQuestion,
  getUserSecurityQuestion,
  verifyAuthentication,
} = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const {
  newAccountValidation,
  emailValidation,
  usernameValidation,
  passwordResetValidation,
} = require("../middlewares/AuthValidation");
const { setCookies, removeCookies } = require("../middlewares/Cookies");
const router = require("express").Router();

router.get("/verifyauthentication", verifyAuthentication);
router.get("/signout", removeCookies);
router.post("/signup", newAccountValidation, signup);
router.post("/signin", signin, setCookies);
router.post("/verifyaccount", verifyAccount);
router.post("/sendverificationcode", sendVerificationcode);

router.put("/updateemail", ensureAuthenticated, updateEmail, setCookies);
router.put("/updateusername", ensureAuthenticated, usernameValidation, updateUsername, setCookies);
router.put("/updatepassword", ensureAuthenticated, updatePassword, setCookies);

router.post("/validateemail", emailValidation, validateEmail);
router.post("/validatepassword", validatePassword);

router.post("/resetpassword", passwordResetValidation, resetPassword, setCookies);
router.post("/unlockaccount", unlockAccount, setCookies);

router.post("/issuspended", isSuspended);
router.post("/userdata", getUserData);

router.get("/securityquestions", getSecurityQuestions);
router.post("/setsecurityquestion", newAccountValidation, setSecurityQuestion, setCookies);
router.post("/getusersecurityquestion", getUserSecurityQuestion);
router.post("/validatesecurityquestion", validateSecurityQuestion);

module.exports = router;
