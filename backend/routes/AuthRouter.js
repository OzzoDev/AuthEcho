const router = require("express").Router();

router.post("signin", (req, res) => {
  res.send("sign in success");
});

router.post("signup", (req, res) => {
  res.send("sign up success");
});

module.exports = router;
