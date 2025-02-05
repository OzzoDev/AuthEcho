const router = require("express").Router();
const {
  accountOverview,
  updateName,
  requestEmailCode,
  updateEmail,
  updatePassword,
  updateSecurityQuestion,
  updateSecurityQuestionAnswer,
} = require("../controllers/AccountController");
const { emailValidation } = require("../middlewares/AuthValidation");
const { setCookies } = require("../middlewares/Cookies");

router.get("/accountoverview", accountOverview);

router.post("/requestemailcode", emailValidation, requestEmailCode);

router.put("/updatename", updateName, setCookies);
router.put("/updateemail", emailValidation, updateEmail, setCookies);
router.put("/updatepassword", updatePassword, setCookies);
router.put("/updatesecurityquestion", updateSecurityQuestion, setCookies);
router.put("/updatesecurityquestionanswer", updateSecurityQuestionAnswer, setCookies);

module.exports = router;
