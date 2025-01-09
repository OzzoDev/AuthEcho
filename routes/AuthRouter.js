const { signup, signin, updateEmail, updateUsername, sendVerificationcode, resetPassword, verifyAccount, validatePassword, verifyAuthorization, getUserName } = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const { signupValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/verifyaccount", verifyAccount);
router.post("/signin", signin);
router.put("/updateemail", ensureAuthenticated, updateEmail);
router.put("/updateusername", ensureAuthenticated, updateUsername);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/validatepassword", validatePassword);
router.post("/resetpassword", resetPassword);
router.get("/verify", ensureAuthenticated, verifyAuthorization);
router.get("/username", getUserName);

module.exports = router;
