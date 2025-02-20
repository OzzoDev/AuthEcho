const {
  trackActivity,
  getTopReviews,
  getDataCounts,
} = require("../controllers/ActivityController");

const router = require("express").Router();

router.put("/trackactivity", trackActivity);
router.get("/reviews", getTopReviews);
router.get("/counts", getDataCounts);

module.exports = router;
