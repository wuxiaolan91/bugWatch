// 公司
const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
  name: String, // 公司名
  userList: { // 这个公司的用户列表
    type: Array,
    default: [
      {
        userId: String,
        roleId: Number,
      },
    ],
  },
grouplist: [ // 这个公司的小组列表
    {
      groupName: String,
      userList: Array,
    },
  ],
projectList: Array, // 这个公司的项目列表
});



const companyModel = mongoose.model('Company', companySchema);




module.exports = projectModel;
