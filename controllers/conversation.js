const { request, response } = require("express");
const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const getAll = async (req = request, res = response) => {
  const myID = req.user._id;
  try {
    let conversations = await Conversation.aggregate([
      {
        $match: {
          members: myID,
        },
      },

      {
        $unwind: "$members",
      },
      {
        $match: {
          members: { $ne: myID },
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
          as: "message",
        },
      },
      {
        $unwind: {
          path: "$message",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { "message.createdAt": -1 }, // Sort messages in descending order based on createdAt
      },
      {
        $group: {
          _id: "$_id",
          friend: { $first: "$friend" }, // Collect the friend information
          lastMessage: { $first: "$message" }, // Collect all messages for each conversation in the 'messages' array
        },
      },
      {
        $project: {
          _id: "$_id",
          friend: 1,
          lastMessage: {
            text: "$lastMessage.text",
            createdAt: "$lastMessage.createdAt",
            isMyMessage: {
              $cond: {
                if: { $eq: ["$lastMessage.sender", myID] }, // Compare the sender with myID
                then: true, // If sender is myID, set isMe to true
                else: false, // If sender is not myID, set isMe to false
              },
            },
          },
        },
      },
      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    res.status(200).json({ conversations, total: conversations.length });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Get all conv: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

const getDetails = async (req = request, res = response) => {
  const { conversationID } = req.params;
  if (!conversationID || !mongoose.isValidObjectId(conversationID))
    return res.status(400).json("There is no conversation with this id");
  try {
    let messages = await Message.find({ conversationID }).sort({
      createdAt: 1,
    });
    // Add isMyMessage key
    messages = messages.map((msg) => ({
      ...msg._doc,
      isMyMessage: req.user._id.toString() == msg.sender,
    }));
    res.status(200).json(messages);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Get all Messages: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

const startConversation = async (req = request, res = response) => {
  const { recieverID } = req.body;
  const myID = req.user._id;

  if (!recieverID || !mongoose.isValidObjectId(recieverID))
    return res.status(400).json("User id is wrong");

  if (req.user.blocked.includes(new mongoose.Types.ObjectId(recieverID)))
    return res.status(400).json("This user is blocked");

  try {
    // check if there is conversation before
    const isConversation = await Conversation.findOne({
      members: { $all: [myID, recieverID] },
    });
    let sendConversation;
    // If user chat before
    if (isConversation) {
      sendConversation = {
        ...isConversation._doc,
        isFirstTime: false,
      };
    } else {
      const conversation = await Conversation.create({
        members: [new mongoose.Types.ObjectId(recieverID), myID],
      });
      sendConversation = {
        ...conversation._doc,
        isFirstTime: true,
      };
    }

    res.status(200).json(sendConversation);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("start conv: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

const editConversation = async (req = request, res = response) => {
  const { conversationID } = req.params;
  const { themeColor } = req.body;
  if (!conversationID || !mongoose.isValidObjectId(conversationID))
    return res.status(400).json("There is no conversation with this id");
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      conversationID,
      {
        themeColor,
      },
      { new: true }
    ).select("-members");
    res.status(200).json(conversation);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Get all Messages: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

const deleteConversation = async (req = request, res = response) => {
  const { conversationID } = req.params;
  if (!conversationID || !mongoose.isValidObjectId(conversationID))
    return res.status(400).json("There is no conversation with this id");
  try {
    await Conversation.findByIdAndDelete(conversationID);
    await Message.deleteMany({ conversationID });
    res.status(200).json(conversationID);
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Get all Messages: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  getAll,
  getDetails,
  startConversation,
  editConversation,
  deleteConversation,
};
