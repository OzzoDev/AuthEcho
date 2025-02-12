const {
  generateAppKey,
  joinApp,
  deleteApp,
  updateApp,
} = require("../controllers/ConnectController");

const router = require("express").Router();

router.post("/join", joinApp);
router.post("/appkey", generateAppKey);

router.put("/updateapp", updateApp);
router.delete("/deleteapp", deleteApp);

module.exports = router;
