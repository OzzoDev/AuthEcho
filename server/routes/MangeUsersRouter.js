const { getUsers } = require("../controllers/MangeUsersController");

const router = require("express").Router();

router.get("/users", getUsers);

module.exports = router;
