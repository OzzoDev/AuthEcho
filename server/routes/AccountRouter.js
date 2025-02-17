const router = require("express").Router();
const {
  accountOverview,
  updateName,
  requestEmailCode,
  updateEmail,
  updatePassword,
  updateSecurityQuestion,
  updateSecurityQuestionAnswer,
  deleteAccount,
  getInvoices,
  markInvoiceAsRead,
  deleteInvoice,
  reportIssue,
} = require("../controllers/AccountController");
const { emailValidation } = require("../middlewares/AuthValidation");
const { setCookies, removeCookies } = require("../middlewares/Cookies");

router.get("/accountoverview", accountOverview);
router.get("/signout", removeCookies);
router.get("/invoices", getInvoices);

router.post("/requestemailcode", emailValidation, requestEmailCode);
router.post("/reportissue", reportIssue);

router.put("/updatename", updateName, setCookies);
router.put("/updateemail", emailValidation, updateEmail, setCookies);
router.put("/updatepassword", updatePassword, setCookies);
router.put("/updatesecurityquestion", updateSecurityQuestion, setCookies);
router.put("/updatesecurityquestionanswer", updateSecurityQuestionAnswer, setCookies);
router.put("/readinvoice", markInvoiceAsRead);

router.delete("/deleteaccount", deleteAccount, removeCookies);
router.delete("/deleteinvoice", deleteInvoice);

module.exports = router;
