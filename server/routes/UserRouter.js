const { trackUser } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/trackuser", trackUser);

module.exports = router;
