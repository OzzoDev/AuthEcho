const { signup, signin } = require("../controllers/AuthController");
const { signupValidation, signinValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signin", signinValidation, signin);
router.post("/signup", signupValidation, signup);

module.exports = router;
