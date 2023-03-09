const {
  models: { User, Follow },
} = require("../../db");

const followUser = async (req, res) => {
  try {
    const { username } = req.params;
    const followingId = req.payload.id;
    const foundUser = await User.findOne({ where: { username } });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (foundUser) {
      if (followingId !== foundUser.id) {
        const [follow, created] = await Follow.findOrCreate({
          where: { userId: foundUser.id, followerId: followingId },
        });
        if (created) {
          return res
            .status(201)
            .json({ message: `You followed ${username}`, follow });
        }
        if (!created) {
          return res
            .status(400)
            .json({ message: "You already follow this user" });
        } else {
          return res
            .status(400)
            .json({ message: "You cannot follow yourself" });
        }
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const unFollowUser = async (req, res) => {
  try {
    const { username } = req.params;
    const followingId = req.payload.id;
    const foundUser = await User.findOne({ where: { username } });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (foundUser) {
      if (followingId !== foundUser.id) {
        const follow = await Follow.findOne({
          where: { userId: foundUser.id, followerId: followingId },
        });
        if (follow) {
          await follow.destroy({
            where: { userId: foundUser.id, followerId: followingId },
          });
          return res
            .status(200)
            .json({ message: `You unfollowed ${username}` });
        }
        if (!follow) {
          return res
            .status(400)
            .json({ message: "You are not following this user" });
        } else {
          return res
            .status(400)
            .json({ message: "You cannot unfollow yourself" });
        }
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  followUser,
  unFollowUser,
};
