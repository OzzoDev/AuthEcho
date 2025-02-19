const { trackActivity } = require("../controllers/ActivityController");

const router = require("express").Router();

router.put("/trackactivity", trackActivity);

module.exports = router;
