const Sequelize = require("sequelize");
const db = require("../db");

const Follow = db.define("follow", {
  followerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      model: "users",
      key: "id",
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      model: "users",
      key: "id",
    },
  },
});

module.exports = Follow;
