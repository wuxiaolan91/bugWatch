const user = require('../models/user.js')
exports.delete = function *() {
  let id = this.request.body.id
  user.remove({"_id": id}, (err, res) => {
    if (err) {
      console.log(err)
    }
  })
}
exports.searchuser = function *() {
  this.body = yield user.find({},  (err, res) => {
    if(err) return
  })
}

