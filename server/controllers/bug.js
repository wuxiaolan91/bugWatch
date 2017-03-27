const bugModel = require('../models/bugModel.js');

exports.bugWatch = function * () {
  console.log('接口拿到');
  const ip = this.request.ip;
  const bugObj = {
    ip,
    website: '', //加这个字段是为了一个Team要同时监测多个网站的错误做区分用的
    errorPage: this.query.pageUrl,
    refferPage: '',
    message: this.query.message,
    error: this.query.error,
    ua: this.request.header['user-agent'],
    date: this.query.time,
  };

  const bug = yield new bugModel(bugObj).save();
  console.log('bug');
  console.log(bug);
  this.body = bug;
};

exports.list = function * () {
  const bugList = yield bugModel.find((err, bugList) => {
    if (err) {
      return console.error(err);
    } else {
      return bugList;
    }
    // let bugList = yield new bugModel.find();

  });
  this.body = bugList;
};
exports.compareList = function*() {
  var date = new Date();
  var todaytoday = date.getDate();
  var yesterDay = new Date();
  yesterDay.setDate(todaytoday - 1);
  yesterDay.setHours('00','00','01');
  date.setHours('24','00','00')
  console.log(yesterDay);
  console.log(date)
  const twoDaybugList = yield bugModel.find({
    time: {
       '$gte': yesterDay,
       '$lte': date
     },
  }).sort().exec((err, bugList) => {
    let yestroday = '';
    if (err) {
        return console.error(err);
      } else {

        return bugList;
      }
  });
  this.body = twoDaybugList;
};
// router.get('/getBugList', function* (next) {
//   mongo.getBugList( function (bugList) {

//   })
// });
