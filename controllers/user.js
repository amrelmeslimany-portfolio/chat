const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const { compressImg } = require("../utils/buffer");
const { saveCloudImage } = require("../middlewares/cloudinary");
const { serverMessage } = require("../utils/variables");
const Conversation = require("../models/Conversation");

// Get All Users
const getUsers = async (req = request, res = response) => {
  const myUser = req.user;
  const { usersType } = req.query;
  try {
    let users = await User.aggregate([
      {
        $match: {
          $and: [
            { _id: { $nin: myUser.blocked } },
            { _id: { $ne: myUser._id } },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1, // If arrays are non-empty, sort by name
        },
      },
      {
        $addFields: {
          isBlocked: { $in: ["$_id", myUser.blocked] }, // Check if friend's ID is in the block array
        },
      },
      {
        $project: {
          username: 1,
          profileImg: "$profileImg.url",
          fullName: { $concat: ["$firstname", " ", "$lastname"] },
          isBlocked: 1,
        },
      },

      {
        $lookup: {
          from: "conversations",
          let: { userId: "$_id", myId: myUser._id },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $in: [
                        "$$myId",
                        { $ifNull: ["$members", []] }, // To handle cases where 'members' is missing or null
                      ],
                    },
                    {
                      $in: [
                        "$$userId",
                        { $ifNull: ["$members", []] }, // To handle cases where 'members' is missing or null
                      ],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "chats",
        },
      },
      {
        $addFields: {
          hasChats: { $gt: [{ $size: "$chats" }, 0] },
        },
      },
      {
        $sort: {
          hasChats: 1, // Sort ascending based on whether the array is empty or not
        },
      },
      ...(usersType && usersType != "all"
        ? [
            {
              $match: {
                hasChats: usersType == "friends",
              },
            },
          ]
        : []),
    ]);
    if (!users) throw Error("Users not found");
    res.status(200).json({ users, total: users.length });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("User details: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};
// Get User
const getDetails = async (req = request, res = response) => {
  const { userId } = req.params;
  if (!userId || !mongoose.isValidObjectId(userId))
    return res.status(400).json("Enter user id or valid id");
  try {
    const user = await User.findById(userId);
    if (!user) throw Error("User not found");
    const { password, blocked, updatedAt, ...sendUser } = user._doc;
    sendUser.profileImg = sendUser.profileImg.url;
    sendUser.isBlocked = req.user.blocked.includes(userId);
    res.status(200).json(sendUser);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("User details: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Edit profile user
const edit = async (req = request, res = response) => {
  const file = req.file;
  const body = req.body;

  if (body.username) return res.status(400).json("You can't update username");
  // Check values
  if (
    !body.firstname &&
    !body.lastname &&
    !body.birthdate &&
    !body.gender &&
    !file &&
    !body.bio &&
    !body.country
  ) {
    return res.status(400).json("You must enter values for updating");
  }

  try {
    // Handle Uploaded image
    if (file) {
      const handledFile = await compressImg(file.buffer);
      const result = await saveCloudImage(handledFile.toString("base64"));
      if (!result) throw Error("Error with uploading image");
      body.profileImg = {
        cloudinary_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstname: body.firstname || req.user.firstname,
        lastname: body.lastname || req.user.lastname,
        bio: body.bio || req.user.bio,
        gender: body.gender || req.user.gender,
        birthday: body.birthday || req.user.birthday,
        counrty: body.country || req.user.country,
        profileImg: !file ? req.user.profileImg : body.profileImg,
      },
      {
        new: true,
      }
    );

    // // Sending the response
    const { password, _id, ...sendUser } = updatedUser._doc;
    sendUser.fullname = `${sendUser.firstname} ${sendUser.lastname}`;
    sendUser.profileImg = sendUser.profileImg.url;
    res.status(200).json(sendUser);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Register: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Edit password
const editPassword = async (req = request, res = response) => {
  const body = req.body;

  if (!body.oldPassword || !body.newPassword || !body.reNewPassword)
    return res.status(400).json("Please enter all fields");

  if (body.newPassword != body.reNewPassword)
    return res.status(400).json("Passwords not equals");

  try {
    // Check password is correct
    const isPasswordCorrect = await bcrypt.compare(
      body.oldPassword,
      req.user.password
    );
    if (!isPasswordCorrect) throw Error("Old Password is wrong");

    // Encrypt new password
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(body.newPassword, salt);
    // Update password
    await User.findByIdAndUpdate(req.user._id, {
      password: encryptPassword,
    });

    // Sending the response
    res.status(200).json("Password is updated");
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Register: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Get Most Chats
const getMostChats = async (req = request, res = response) => {
  const myid = req.user._id;
  try {
    let users = await Conversation.aggregate([
      {
        $match: {
          members: myid,
        },
      },

      {
        $unwind: "$members",
      },
      {
        $match: {
          members: { $ne: myid },
        },
      },

      {
        $lookup: {
          from: "users", // The name of the User model's collection
          localField: "members",
          foreignField: "_id",
          as: "friend",
        },
      },
      {
        $unwind: "$friend", // Unwind the friendData array (resulting from the lookup) to get the single document
      },

      {
        $addFields: {
          "friend.isBlocked": { $in: ["$friend._id", req.user.blocked] }, // Check if friend's ID is in the block array
        },
      },
      {
        $project: {
          "friend.fullname": {
            $concat: ["$friend.firstname", " ", "$friend.lastname"],
          },
          "friend.profileImg": "$friend.profileImg.url",
          "friend._id": 1,
          "friend.isBlocked": 1,
        },
      },
      {
        $lookup: {
          from: "messages", // The name of the User model's collection
          localField: "_id",
          foreignField: "conversationID",
          as: "messages",
        },
      },
      {
        $addFields: {
          messageCount: { $size: "$messages" },
        },
      },
      {
        $sort: { messageCount: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: "$_id",
          friend: 1,
          messageCount: 1,
        },
      },
    ]);
    if (!users) throw Error("Users not found");
    res.status(200).json({ users, total: users.length });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("User details: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Get Block Users
const getBlockList = async (req = request, res = response) => {
  try {
    const blockedUsers = await User.aggregate([
      {
        $match: {
          _id: req.user._id, // Match the current user
        },
      },
      {
        $lookup: {
          from: "users", // The collection to join with
          localField: "blocked",
          foreignField: "_id",
          as: "blockedUsers",
        },
      },
      {
        $unwind: "$blockedUsers", // Unwind the blockedUsers array
      },
      {
        $project: {
          _id: 0,
          userId: "$blockedUsers._id",
          profileImg: "$blockedUsers.profileImg.url",
          fullname: {
            $concat: ["$blockedUsers.firstname", " ", "$blockedUsers.lastname"],
          },
        },
      },
    ]);

    res.status(200).json({ blockedUsers, total: blockedUsers.length });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("User Block: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

// Block Users
const blockUser = async (req = request, res = response) => {
  const myid = req.user._id;
  const { userId } = req.params;
  if (!userId || !mongoose.isValidObjectId(userId))
    return res.status(400).json("Enter user id or valid id");
  try {
    if (!(await User.findById(userId))) throw Error("User not found");
    const isBlocked = req.user.blocked.includes(userId);
    const updated = await User.findByIdAndUpdate(
      myid,
      { [isBlocked ? "$pull" : "$push"]: { blocked: userId } },
      { new: true }
    );
    res
      .status(200)
      .json({ userId, isBlocked: updated.blocked.includes(userId) });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("User Block: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  getUsers,
  getDetails,
  edit,
  editPassword,
  getMostChats,
  blockUser,
  getBlockList,
};
