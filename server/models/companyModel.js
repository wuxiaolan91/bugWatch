// 公司
const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  companyName: String, // 公司名
  ownerId: String, // 公司的拥有者是
  userList: { // 这个公司的用户列表
    type: Array,
    default: [
      {
        userId: String,
        gradeid: Number,
      },
    ],
  },
  grouplist: { // 这个公司的小组列表
    type: Array,
    default:[{
      groupName: {
        type: String,
        default: '全部用户'
      },
      userList: Array,
    }]
  },
  projectList: Array, // 这个公司的项目列表
});

const companyModel = mongoose.model('company', companySchema);
module.exports = companyModel;
