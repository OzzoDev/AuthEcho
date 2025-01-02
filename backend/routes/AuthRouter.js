const { signup } = require("../controllers/AuthController");
const { signupValidation } = require("../middlewares/AuthValidation");

const router = require("express").Router();

router.post("/signin", (req, res) => {
  res.send("sign in success");
});

router.post("/signup", signupValidation, signup);

module.exports = router;
