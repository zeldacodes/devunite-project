const router = require("express").Router();

const userRoutes = require("../auth/routes");

router.use("/users", userRoutes);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
