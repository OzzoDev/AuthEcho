const router = require("express").Router();
const { accountOverview } = require("../controllers/AccountController");

router.get("/accountoverview", accountOverview);

module.exports = router;
