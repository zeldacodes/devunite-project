//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Follow = require("./models/Follow");

//associations could go here!
User.belongsToMany(User, {
  as: "followers",
  foreignKey: "userId",
  through: "follows",
});

User.belongsToMany(User, {
  as: "following",
  foreignKey: "followerId",
  through: "follows",
});

Follow.belongsTo(User, {
  as: "following",
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Follow.belongsTo(User, {
  as: "follower",
  foreignKey: "followerId",
  onDelete: "CASCADE",
});

module.exports = {
  db,
  models: {
    User,
    Follow,
  },
};
