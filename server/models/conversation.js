const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [mongoose.Types.ObjectId],
  },
  {timestamps: true}
);
module.exports = mongoose.model("Conversation", conversationSchema);
