const router = require("express").Router();

const follows = require("./controller");

const authChecker = require("../../middleware");

router.get("/:username", authChecker.verifyToken, follows.followUser);

router.delete("/:username", authChecker.verifyToken, follows.unFollowUser);

module.exports = router;
