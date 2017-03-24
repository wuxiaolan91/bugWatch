const dashboardModel = require('../models/dashboard.js');

exports.bugWatch = function *() {
  console.log('接口拿到');
  const ip = this.request.ip;
  const bugObj = {
    ip,
    errorPage: this.query.pageUrl,
    refferPage: '',
    errorJs: 'http://m.wecash.net/wep/index.html?version=h5 :1:19',
    message: this.query.message,
    error: this.query.error,
    ua: this.request.header['user-agent'],
    date: this.query.time
  };

  const ab = yield new dashboardModel(bugObj).save();
  console.log('ab');
  console.log(ab);
  this.body = ab;
};

exports.list = function *() {
  this.body = '我是bug列表';
}
// router.get('/getBugList', function* (next) {
//   mongo.getBugList( function (bugList) {

//   })
// });
