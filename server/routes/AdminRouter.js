const { getOverview } = require("../controllers/AdminController");

const router = require("express").Router();

router.get("/overview", getOverview);

module.exports = router;
