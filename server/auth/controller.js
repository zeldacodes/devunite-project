const {
  models: { User },
} = require("../db");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const foundUser = await User.findAll({ where: { email: email } });
    if (foundUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await User.create({ username, email, password });
    const token = await newUser.generateToken();
    const newlyCreatedUser = await User.findOne({
      where: { email: newUser.email },
      attributes: { exclude: ["password"] },
    });
    return res.status(201).json({ user: newlyCreatedUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// const loginUser = async (req, res) => {
//   try {
//   } catch (error) {}
// };

module.exports = {
  createUser,
};
