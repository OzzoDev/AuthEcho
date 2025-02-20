const { trackActivity, getTopReviews } = require("../controllers/ActivityController");

const router = require("express").Router();

router.put("/trackactivity", trackActivity);
router.get("/reviews", getTopReviews);

module.exports = router;
