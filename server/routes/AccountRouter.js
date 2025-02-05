const router = require("express").Router();
const {
  accountOverview,
  updateName,
  requestEmailCode,
} = require("../controllers/AccountController");
const { setCookies } = require("../middlewares/Cookies");

router.get("/accountoverview", accountOverview);
router.get("requestemailcode", requestEmailCode);

router.put("/updatename", updateName, setCookies);
router.put("/updateemail", updateName, setCookies);
router.put("/updatepassword", updateName, setCookies);
router.put("/updatesecurityquestion", updateName, setCookies);
router.put("/updatesecurityquestionanswer", updateName, setCookies);

module.exports = router;
