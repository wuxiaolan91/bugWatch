const bugModel = require('../models/bugModel.js');
const getListByEveryHour = (bugList) => { // 按照每个时间段筛选出昨天和今天的bug列表
  let timeList = [];
  for (let i = 0; i < 24; i++) {
    timeList.push(0);
  }
  bugList.forEach((item) => {
    const hour = new Date(item.time).getHours();
    timeList[hour] = timeList[hour] + 1;
  });
  return timeList;
};
exports.bugWatch = function* () {
  console.log('接口拿到');
  const ip = this.request.ip;
  const bugObj = {
    ip,
    website: '', // 加这个字段是为了一个Team要同时监测多个网站的错误做区分用的
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

exports.list = function* () {
  const bugList = yield bugModel.find((err, bugList) => {
    if (err) {
      return console.error(err);
    } 
      return bugList;
    
    // let bugList = yield new bugModel.find();

  });
  this.body = bugList;
};
exports.compareList = function* () {
  let date = new Date();
  let todaytoday = date.getDate();
  let yesterDay = new Date();
  yesterDay.setDate(todaytoday - 1);
  yesterDay.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const twoDaybugList = yield bugModel.find({
    time: {
      $gte: yesterDay,
      $lte: date,
    },
  }).sort().exec((err, bugList) => {
    let yestroday = '';
    if (err) {
        return console.error(err);
      } 

        return bugList;
      
  });
  const yesterdayBugList = []; // 昨天的bug列表
  const todayBugList = []; // 今天的bug列表
  twoDaybugList.forEach((item) => {
    const date = new Date();
    date.setHours('00', '00', '01');
    let todayStart = date.getTime();
    if (new Date(item.time).getTime() > todayStart) {
        todayBugList.push(item);
      } else {
        yesterdayBugList.push(item);
      }
  });

  this.body = {
    yesterBugCountList: getListByEveryHour(yesterdayBugList),
    todayBugCountList: getListByEveryHour(todayBugList),
  };
};
// router.get('/getBugList', function* (next) {
//   mongo.getBugList( function (bugList) {

//   })
// });
