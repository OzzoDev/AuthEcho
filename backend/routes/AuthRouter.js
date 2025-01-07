const { signup, signin, updateEmail, updateUsername } = require("../controllers/AuthController");
const ensureAuthenticated = require("../middlewares/Auth");
const { signupValidation, signinValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signin", signinValidation, signin);
router.post("/signup", signupValidation, signup);
router.post("/updateemail", ensureAuthenticated, updateEmail);
router.post("/updateusername", ensureAuthenticated, updateUsername);

module.exports = router;
