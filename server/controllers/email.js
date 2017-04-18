const userModel = require('../models/user.js');

let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.163.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: '',
    pass: ''
  }
});
exports.sendemail = function (mailOptions) {
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('发送邮件失败' +error);
    }else{
      console.log('Message sent: ' + info.response);
    }})
}
