const ConversationModel = require("../../models/conversation");
const MessageModel = require("../../models/message");
const mongoose = require("mongoose");

//new conversation
exports.createConversation = async (req, res) => {
  console.log("create conversation reached");
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const saveConversation = await newConversation.save();
    res.status(200).json(saveConversation);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "something went wrong"});
  }
};

//get conversation
exports.getConversation = async (req, res) => {
  console.log("hello get conversation reached");
  try {
    console.log("get conversation reached");
    const myConversations = await ConversationModel.find({
      members: {$in: [req.params.id]},
    });
    res.status(200).json(myConversations);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err});
  }
};

//create new message
exports.createMessage = async (req, res) => {
  console.log("hello create message");
  const newMessage = new MessageModel(req.body);
  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err});
  }
};

//get message
exports.getMessage = async (req, res) => {
  console.log("hello get message");
  try {
    const messages = await MessageModel.find({
      conservationId: req.params.convId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};
