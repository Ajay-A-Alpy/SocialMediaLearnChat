const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: false},
  mobile: {type: String, required: true},
  googleId: {type: String, required: false},
  place: {type: String},
  classNum: {type: String},
  school: {type: String},
  subjects: {type: String},
  hobbies: {type: String},
  dob: {type: Date},
  profilePic: String,
  createdAt: {type: Date},
  followers: [mongoose.ObjectId],
  following: [mongoose.ObjectId],
  experts: [mongoose.ObjectId],
  public: Boolean,
});

module.exports = mongoose.model("students", studentSchema);
