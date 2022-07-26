const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  userId: mongoose.ObjectId,
  username: {type: String, required: true},
  description: {type: String, required: true},
  images: String,
  verifiedCount: {type: [mongoose.ObjectId]},
  public: Boolean,
  answers: [
    {
      commentorId: mongoose.ObjectId,
      commentedBy: {type: String, required: true},
      text: String,
      commentedAt: {type: Date, dafault: new Date()},
      isExpert: {type: Boolean, default: false},
    },
  ],
});

QuestionSchema.set("timestamps", true);
const QuestionModal = mongoose.model("Questions", QuestionSchema);
module.exports = QuestionModal;
