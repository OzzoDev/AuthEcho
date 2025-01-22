const { join } = require("../controllers/ConnectController");

const router = require("express").Router();

router.post("/join", join);

module.exports = router;
