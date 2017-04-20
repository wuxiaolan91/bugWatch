const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  name: String, // 项目名
  projectId: String, // 项目id
  userList: Array // 这个项目的用户
})
const projectModel = mongoose.model('Project', projectSchema);
module.exports = projectModel;
