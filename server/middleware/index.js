const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized Action: Access Denied" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (error, payload) => {
    if (error) {
      console.error(error);
      return res.status(403).json({ message: error.message });
    }
    req.payload = payload;
    return next();
  });
};

module.exports = { verifyToken };
