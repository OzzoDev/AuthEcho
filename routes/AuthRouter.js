const { signup, signin, updateEmail, updateUsername, sendVerificationcode, resetPassword, verifyAccount, validatePassword, verifyAuthorization, getUserData, validateEmail, updatePassword } = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const { signupValidation, emailValidation, usernameValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/verifyaccount", verifyAccount);
router.post("/signin", signin);
router.put("/updateemail", ensureAuthenticated, updateEmail);
router.put("/updateusername", ensureAuthenticated, usernameValidation, updateUsername);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/validateemail", emailValidation, validateEmail);
router.post("/validatepassword", validatePassword);
router.post("/resetpassword", resetPassword);
router.put("/updatepassword", ensureAuthenticated, updatePassword);
router.get("/verify", ensureAuthenticated, verifyAuthorization);
router.post("/userdata", getUserData);

module.exports = router;
