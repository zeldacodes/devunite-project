const router = require("express").Router();

const users = require("./controller");

const authChecker = require("../../middleware");

router.post("/register", users.registerUser);

router.post("/login", users.loginUser);

router.get("/", users.getAllUsers);

router.get("/:id", users.getUser);

router.put("/", authChecker.verifyToken, users.updateUser);

router.get("/my-profile/me", authChecker.verifyToken, users.getMyProfile);

module.exports = router;
