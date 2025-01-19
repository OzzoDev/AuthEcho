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

const router = require("express").Router();

router.get("/verifyauthentication", verifyAuthentication);
router.post("/signup", newAccountValidation, signup);
router.post("/verifyaccount", verifyAccount);
router.post("/signin", signin);
router.put("/updateemail", ensureAuthenticated, updateEmail);
router.put("/updateusername", ensureAuthenticated, usernameValidation, updateUsername);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/validateemail", emailValidation, validateEmail);
router.post("/validatepassword", validatePassword);
router.post("/resetpassword", passwordResetValidation, resetPassword);
router.put("/updatepassword", ensureAuthenticated, updatePassword);
router.post("/unlockaccount", unlockAccount);
router.post("/issuspended", isSuspended);
router.post("/userdata", getUserData);
router.get("/securityquestions", getSecurityQuestions);
router.post("/setsecurityquestion", newAccountValidation, setSecurityQuestion);
router.post("/getusersecurityquestion", getUserSecurityQuestion);
router.post("/validatesecurityquestion", validateSecurityQuestion);

const pong = (_, res) => {
  res.send("PONG");
};

router.get("/ping", pong);

module.exports = router;
