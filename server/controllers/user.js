const user = require('../models/user.js')
exports.delete = function *() {
  let id = this.request.body.id
  user.remove({"_id": id}, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
  this.body = '1'
}
exports.searchuser = function *() {
  this.body = yield user.find({},  (err, res) => {
    if(err) return
  })
  console.log(this.body)
}
/* 用户登录 */
exports.login = function *() {
}

