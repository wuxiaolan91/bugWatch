const userModel = require('../models/user.js');
let nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  host: "smtp.163.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: 'lyz1051500917@163.com',
    pass: 'lyz1991L'
  }
});

let mailOptions = {
  from: 'lyz1051500917@163.com', // sender address
  to: '1051500917@qq.com', // list of receivers
  subject: '邮件程序，第一个给乐乐', // Subject line
  text: '邮件程序，第一个给乐乐', // plaintext body
  html: '<b>邮件程序，第一个给乐乐</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
  }else{
    console.log('Message sent: ' + info.response);
  }
})
exports.sendemail = function *() {
  console.log(2222)
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }})
}
