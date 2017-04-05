const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ajaxSchema = new Schema({
  pageUrl: String,
  url: String,
  message: String,
  error: String
});
const ajaxModel = mongoose.model('Ajax', ajaxSchema);
module.exports = ajaxModel;
