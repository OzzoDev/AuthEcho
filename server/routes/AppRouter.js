const router = require("express").Router();
const {
  requestCode,
  verifyCode,
  validateQuestion,
  signIn,
  verifySession,
} = require("../controllers/AppController");
const { verifyAuthentication } = require("../controllers/AuthController");
const { setCookies, removeCookies } = require("../middlewares/Cookies");
const { ensureUser } = require("../middlewares/Auth");

router.get("/signout", removeCookies);
router.get("/authenticate", verifyAuthentication);
router.get("/verifysession", verifySession);

router.post("/requestcode", ensureUser, requestCode);
router.post("/verifycode", ensureUser, verifyCode);
router.post("/validatequestion", ensureUser, validateQuestion);
router.post("/signin", ensureUser, signIn, setCookies);

module.exports = router;
