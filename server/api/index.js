const router = require("express").Router();

const userRoutes = require("../features/auth/routes");

const followRoutes = require("../features/follow/routes");

router.use("/users", userRoutes);

router.use("/follow", followRoutes);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
