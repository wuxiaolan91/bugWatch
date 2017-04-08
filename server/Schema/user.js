const mongoose = require('mongoose')
const user = new mongoose.Schema({
  name: String, // 用户名
  email: String, // 邮件
  pass: String, // 密码
  role: String //角色
})

module.exports = user
