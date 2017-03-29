const user = require('../models/user.js')
exports.delete = function *() {
  let id = this.request.body.id
  console.log(id)
  this.body = yield user.remove({"_id": {$in: id}}, (err, res) => {
    if (err) {
      console.log(err)
    }
    return 1
  })
}
exports.searchuser = function *() {
  this.body = yield user.find({},  (err, res) => {
    if(err) return
  })
}

