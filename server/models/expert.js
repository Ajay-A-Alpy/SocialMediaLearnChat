const mongoose = require("mongoose");

const expertSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: false},
  mobile: {type: String, required: true},
  googleId: {type: String, required: false},
  place: {type: String},
  dob: {type: Date},
  education: {type: String},
  institute: {type: String},
  subjects: {type: String},
  hobbies: {type: String},
  experience: String,
  followers: [mongoose.ObjectId],
  following: [mongoose.ObjectId],
  students: [mongoose.ObjectId],
  about: String,
  createdAt: {type: Date},
  public: Boolean,
  expert: Boolean,
  images: String,
  blockStatus: Boolean,
});

module.exports = mongoose.model("experts", expertSchema);
