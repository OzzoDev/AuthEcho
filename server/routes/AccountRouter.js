const router = require("express").Router();
const {
  accountOverview,
  updateName,
  requestEmailCode,
  updateEmail,
} = require("../controllers/AccountController");
const { emailValidation } = require("../middlewares/AuthValidation");
const { setCookies } = require("../middlewares/Cookies");

router.get("/accountoverview", accountOverview);

router.post("/requestemailcode", emailValidation, requestEmailCode);

router.put("/updatename", updateName, setCookies);
router.put("/updateemail", emailValidation, updateEmail, setCookies);
router.put("/updatepassword", updateName, setCookies);
router.put("/updatesecurityquestion", updateName, setCookies);
router.put("/updatesecurityquestionanswer", updateName, setCookies);

module.exports = router;
