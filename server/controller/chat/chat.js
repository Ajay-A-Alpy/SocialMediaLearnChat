const ConversationModel = require("../../models/conversation");
const MessageModel = require("../../models/message");
const mongoose = require("mongoose");

//new conversation
exports.createConversation = async (req, res) => {
  console.log("create conversation reached");
  let expert;
  console.log(req.body);
  if (req.body.expert) {
    expert = true;
  } else {
    expert = false;
  }
  let membersArray = [];
  let groupName = "";
  if (req.body.groupName) {
    for (let i = 0; i < req.body.member.length; i++) {
      membersArray.push(mongoose.Types.ObjectId(req.body.member[i]));
    }
    groupName = req.body.groupName;
  } else {
    for (let i = 0; i < req.body.length; i++) {
      membersArray.push(mongoose.Types.ObjectId(req.body[i]));
    }
  }

  console.log("create conversation got", membersArray, groupName);
  const newConversation = new ConversationModel({
    members: membersArray,
    groupName,
    expert,
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
      members: {$in: [req.userId]},
      expert: false,
    });
    res.status(200).json(myConversations);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err});
  }
};

//get  expert conversation
exports.getExpertConversation = async (req, res) => {
  console.log("hello  expert get conversation reached");
  try {
    console.log(" expert get conversation reached");
    const myConversations = await ConversationModel.find({
      members: {$in: [req.params.id]},
      expert: true,
    });
    res.status(200).json(myConversations);
  } catch (err) {
    console.log(err);
    res.status(500).json({message: err});
  }
};

//get chat status
exports.getChatStatus = async (req, res) => {
  let firstUser = req.body.first;
  let secondUser = req.body.second;
  console.log("hello get chat status reached");
  try {
    console.log("get chat status reached");
    const Conversation = await ConversationModel.findOne({
      $and: [
        {
          members: mongoose.Types.ObjectId(firstUser),
        },
        {
          members: mongoose.Types.ObjectId(secondUser),
        },
      ],
    });

    console.log(Conversation);

    if (Conversation) {
      console.log("got a  chat");
      res.status(200).json({chat: true});
    } else {
      console.log(" no chats");
      res.status(200).json({chat: false});
    }
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
      conversationId: req.params.convId,
    });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};
