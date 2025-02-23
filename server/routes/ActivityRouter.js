const {
  trackActivity,
  getTopReviews,
  getDataCounts,
} = require("../controllers/ActivityController");
const { ensureAuthenticated } = require("../middlewares/Auth");

const router = require("express").Router();

router.put("/trackactivity", ensureAuthenticated, trackActivity);
router.get("/reviews", getTopReviews);
router.get("/counts", getDataCounts);

module.exports = router;
