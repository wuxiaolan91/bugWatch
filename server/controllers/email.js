const userModel = require('../models/user.js');
const nodemailer = require("nodemailer");
const emailAuth = require('../config/local.config.js');
let transporter = nodemailer.createTransport({
  host: "smtp.163.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: emailAuth.fromEmailAuth
});

exports.sendemail = function (mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      console.log(mailOptions.to + '发送邮件失败' + error);
    }else{
      console.log(mailOptions.to + '邮件消息发送: ' + info.response);
    }})
}
