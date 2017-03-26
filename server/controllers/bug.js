const bugModel = require('../models/bug.js');

exports.bugWatch = function *() {
  console.log('接口拿到');
  const ip = this.request.ip;
  const bugObj = {
    ip,
    errorPage: this.query.pageUrl,
    refferPage: '',
    message: this.query.message,
    error: this.query.error,
    ua: this.request.header['user-agent'],
    date: this.query.time
  };

  const bug = yield new bugModel(bugObj).save();
  console.log('bug');
  console.log(bug);
  this.body = bug;
};

exports.list = function *() {
  let bugList = yield new bugModel.find();
  this.body = bugList;
}
// router.get('/getBugList', function* (next) {
//   mongo.getBugList( function (bugList) {

//   })
// });
