const { generateAppKey, joinApp } = require("../controllers/ConnectController");

const router = require("express").Router();

router.post("/join", joinApp);
router.post("/appkey", generateAppKey);

router.put("/updateapp");
router.delete("/deleteapp");

module.exports = router;
