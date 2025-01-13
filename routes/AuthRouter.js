const { signup, signin, updateEmail, updateUsername, sendVerificationcode, resetPassword, verifyAccount, validatePassword, verifyAuthorization, getUserData, validateEmail, updatePassword, unlockAccount, isSuspended, getSecurityQuestions, setSecurityQuestion } = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const { newAccountValidation, emailValidation, usernameValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.get("/verify", ensureAuthenticated, verifyAuthorization);
router.post("/signup", newAccountValidation, signup);
router.post("/verifyaccount", verifyAccount);
router.post("/signin", signin);
router.put("/updateemail", ensureAuthenticated, updateEmail);
router.put("/updateusername", ensureAuthenticated, usernameValidation, updateUsername);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/validateemail", emailValidation, validateEmail);
router.post("/validatepassword", validatePassword);
router.post("/resetpassword", resetPassword);
router.put("/updatepassword", ensureAuthenticated, updatePassword);
router.post("/unlockaccount", unlockAccount);
router.post("/issuspended", isSuspended);
router.post("/userdata", getUserData);
router.get("/securityQuestions", getSecurityQuestions);
router.post("/setsecurityQuestion", newAccountValidation, setSecurityQuestion);

module.exports = router;
