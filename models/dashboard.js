const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  errorPage: String,
  refferPage: String,
  errorJs: String,
  message: String,
  error: String,
  ua: String,
  date: Date,
});
const bug = mongoose.model('Bug', bugSchema);
module.exports = bug;
