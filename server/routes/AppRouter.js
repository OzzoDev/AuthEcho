const router = require("express").Router();
const {
  requestCode,
  verifyCode,
  validateQuestion,
  signIn,
  trackUserActivity,
} = require("../controllers/AppController");
const {
  setAppCookies,
  removeAppCookies,
  authenticateApp,
  verifyAppSession,
} = require("../middlewares/Cookies");
const { ensureUser } = require("../middlewares/Auth");

router.get("/signout", removeAppCookies);
router.get("/authenticate", authenticateApp);
router.get("/verifysession", verifyAppSession);
router.get("/activity", ensureUser, trackUserActivity);

router.post("/requestcode", ensureUser, requestCode);
router.post("/verifycode", ensureUser, verifyCode);
router.post("/validatequestion", ensureUser, validateQuestion);
router.post("/signin", ensureUser, signIn, setAppCookies);

module.exports = router;
