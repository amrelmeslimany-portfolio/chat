const { request, response } = require("express");
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const sendMessage = async (req = request, res = response) => {
  const { conversationID } = req.params;
  const { text, friendId } = req.body;
  const myID = req.user._id;

  if (req.user.blocked.includes(friendId))
    return res.status(400).json("This user is blocked");

  if (!conversationID || !mongoose.isValidObjectId(conversationID))
    return res.status(400).json("There is no conversation with this id");

  if (!text) return res.status(400).json("You must enter message");

  try {
    const friend = await User.findById(friendId);
    if (friend?.blocked.includes(myID))
      throw Error(`${friend.firstname} blocking you`);
    const isConversation = await Conversation.findById(conversationID);
    if (!isConversation) throw Error("There is no conversation with this id");

    let message = await Message.create({
      conversationID,
      text,
      sender: myID,
    });

    res
      .status(200)
      .json({ ...message._doc, isMyMessage: message.sender == myID });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Post all Messages: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

const removeMessage = async (req = request, res = response) => {
  const { messageId } = req.body;

  if (!messageId || !mongoose.isValidObjectId(messageId))
    return res.status(400).json("There is no message with this id");

  try {
    const message = await Message.findById(messageId);

    if (message?.sender != req.user.id)
      throw Error("No permission on this message");
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ messageId });
  } catch (error) {
    // FIXME remove this line (remove Log)
    console.log("Delete Message: ", error);
    res.status(400).json(error.message || serverMessage);
  }
};

module.exports = {
  sendMessage,
  removeMessage,
};
