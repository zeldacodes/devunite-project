const router = require("express").Router();

const users = require("./controller");

router.post("/register", users.createUser);

module.exports = router;
