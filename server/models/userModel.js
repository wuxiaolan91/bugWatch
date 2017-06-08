const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  compnayId: String,
  name: String,
  realName: String,
  email: String,
  password: String
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
