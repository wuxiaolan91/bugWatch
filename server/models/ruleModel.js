const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ruleSchema = new Schema({
  projectId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  keyword: {
    type: String,
    required: true
  },
});
const ruleModel = mongoose.model('Rule', ruleSchema);
module.exports = ruleModel;
