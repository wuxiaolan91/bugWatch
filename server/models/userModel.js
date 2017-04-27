const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  role: String
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
