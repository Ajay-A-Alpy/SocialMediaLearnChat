const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: {type: String, required: true},
  userId: mongoose.ObjectId,
  username: {type: String, required: true},
  description: {type: String, required: true},
  subject: {type: String, required: true},
  images: String,
  likes: {type: [mongoose.ObjectId]},
  verifiedCount: {type: [mongoose.ObjectId]},
  public: Boolean,
  expert: Boolean,
  comments: [
    {
      commentorId: mongoose.ObjectId,
      commentedBy: {type: String, required: true},
      text: String,
      commentedAt: {type: Date, dafault: new Date()},
      isExpert: {type: Boolean, default: false},
    },
  ],
});

articleSchema.set("timestamps", true);
const ArticleModal = mongoose.model("studentArticles", articleSchema);
module.exports = ArticleModal;
