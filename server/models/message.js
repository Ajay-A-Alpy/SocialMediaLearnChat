const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    text: String,
  },
  {timestamps: true}
);
module.exports = mongoose.model("Message", messageSchema);
