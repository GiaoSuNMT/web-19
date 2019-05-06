const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  email: String,
  name: String,
  birthday : Date,
  introduce: String,
  accessToken : String,
  gender: String,
  school: String,
  avatarUrl: Array,
  contact: String,
  fbId: String,
  createdAt: {
    type: Date,
    default: new Date().toUTCString()
  },
  OTP: {
    type: String,
    required: true,
    default: "000000"
  },
  verify: {
    type: Boolean,
    required: true,
    default: false
  },
  Like: [{ id: String, date: Date }],
  Liked: [{ id: String, date: Date }],
});
const UserModel = mongoose.model('User', user);
module.exports = UserModel;