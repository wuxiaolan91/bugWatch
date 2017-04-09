const user = require('../models/user.js')

let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.163.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 465, // SMTP 端口
  auth: {
    user: 'lyz1051500917@163.com',
    pass: 'lyz1991L'
  }
});
 exports.sendemail = function *(mailOptions) {
  for (let i = 0; i < this.request.body.email.length; i++) {
    console.log(this.request.body.email[i])
    const mailOptions = {
      from: 'lyz1051500917@163.com', // sender address
      to: `${this.request.body.email[i]}`, // list of receivers
      subject: `bug来啦`, // Subject line
      text: `${this.request.body.content}`
    }
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log('发送邮件失败' +error);
      }else{
        console.log('Message sent: ' + info.response);
      }})
  }
}

exports.searchuser = function *() {
  this.body = yield user.find({},  (err, res) => {
    if(err) return
  })
}
/* 用户登录 */
exports.login = function *() {
  console.log()
}

