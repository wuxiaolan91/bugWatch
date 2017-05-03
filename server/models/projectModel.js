const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  name: String, // 项目名
  userList: { // 这个项目的用户列表
    type: Array,
    default: [
      {
        userId: String,
        roleId: Number
      }
    ]
  } 
})



const projectModel = mongoose.model('Project', projectSchema);




module.exports = projectModel;
