const {
  models: { User },
} = require("../../db");

const registerUser = async (req, res) => {
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
    return res.status(201).json({
      message: "User registered successfully",
      user: newlyCreatedUser,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const foundUser = await User.findOne({
      where: { email: email },
    });
    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "User not found - Please register" });
    }
    const checkPassword = await foundUser.correctPassword(password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect login credentials" });
    }
    const token = await foundUser.generateToken();
    return res.status(200).json({
      message: "Login successful",
      username: foundUser.username,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "Users found", users: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User found",
      user: singleUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.payload.id;
    const { skills, bio } = req.body;
    const singleUser = await User.findOne({
      where: { id: userId },
    });
    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await singleUser.update(
      { skills, bio },
      { where: { id: userId } }
    );
    const newlyUpdatedUser = await User.findOne({
      where: { id: updatedUser.id },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json({
      message: "User profile updated successfully",
      user: newlyUpdatedUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
};
