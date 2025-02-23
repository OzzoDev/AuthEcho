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
const { ensureUser, ensureAuthenticatedByApp } = require("../middlewares/Auth");
const { signOut } = require("../controllers/AccountController");

router.get("/signout", ensureAuthenticatedByApp, signOut, removeAppCookies);
router.get("/authenticate", authenticateApp);
router.get("/verifysession", verifyAppSession);

router.put("/activity", ensureAuthenticatedByApp, trackUserActivity);

router.post("/requestcode", ensureUser, requestCode);
router.post("/verifycode", ensureUser, verifyCode);
router.post("/validatequestion", ensureUser, validateQuestion);
router.post("/signin", ensureUser, signIn, setAppCookies);

module.exports = router;
