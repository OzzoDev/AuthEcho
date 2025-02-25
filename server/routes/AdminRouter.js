const {
  getOverview,
  deleteUser,
  freezeAccount,
  deleteApp,
  freezeApp,
  deleteIssue,
  resolveIssue,
  appActivity,
} = require("../controllers/AdminController");

const router = require("express").Router();

router.get("/overview", getOverview);

router.post("/deleteuser", deleteUser);
router.post("/freezeaccount", freezeAccount);
router.post("/deleteapp", deleteApp);
router.post("/freezeapp", freezeApp);
router.post("/deleteissue", deleteIssue);
router.post("/resolveissue", resolveIssue);
router.post("/appactivity", appActivity);

module.exports = router;
