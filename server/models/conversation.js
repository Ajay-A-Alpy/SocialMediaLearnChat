const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: [mongoose.Types.ObjectId],
    expert: Boolean,
    groupName: {type: String},
  },
  {timestamps: true}
);
module.exports = mongoose.model("Conversation", conversationSchema);
