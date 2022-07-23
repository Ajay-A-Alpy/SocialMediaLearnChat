const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: false},
  mobile: {type: String, required: true},
  googleId: {type: String, required: false},
  place: {type: String},
  dob: {type: Date},
  createdAt: {type: Date},
  images: String,
  isAdmin: {type: Boolean, dafault: true},
});

module.exports = mongoose.model("admin", AdminSchema);
