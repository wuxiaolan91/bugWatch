const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  gradeId: Number
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
