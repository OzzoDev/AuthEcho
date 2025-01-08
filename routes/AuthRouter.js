const { signup, signin, updateEmail, updateUsername, sendVerificationcode, resetPassword, verifyAccount } = require("../controllers/AuthController");
const { ensureAuthenticated } = require("../middlewares/Auth");
const { signupValidation, signinValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signin", signinValidation, signin);
router.post("/verifyaccount", verifyAccount);
router.post("/signup", signupValidation, signup);
router.put("/updateemail", ensureAuthenticated, updateEmail);
router.put("/updateusername", ensureAuthenticated, updateUsername);
router.post("/sendverificationcode", sendVerificationcode);
router.post("/resetpassword", resetPassword);

module.exports = router;
