const router = require("express").Router();

const users = require("./controller");

router.post("/register", users.registerUser);

router.post("/login", users.loginUser);

router.get("/", users.getAllUsers);

router.get("/:id", users.getUser);

module.exports = router;
