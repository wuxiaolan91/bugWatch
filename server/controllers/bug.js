const bugModel = require('../models/bugModel.js');
const getListByEveryHour = (bugList) => { // 按照每个时间段筛选出昨天和今天的bug列表
  const timeList = [];
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
  this.body = bug;
};

exports.list = function* () { // 获取bug列表，还没有哪个地方用到
  const bugList = yield bugModel.find((err, bugList) => {
    if (err) {
      return console.error(err);
    }
    return bugList;

    // let bugList = yield new bugModel.find();

  });
  this.body = bugList;
};
exports.pageTopList = function* () { // 显示一周内报错最多的页面
  const date = new Date(); // 今天
  const sevenDayStart = new Date();
  sevenDayStart.setDate(date.getDate() - 7);
  const yesterDay = new Date();
  yesterDay.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const twoDaybugList = yield bugModel.find({
    time: {
      $gte: yesterDay,
      $lte: date,
    },
  }).sort().exec((err, bugList) => {
  });
};
exports.compareList = function* () { // 显示昨天和今天每个时间段的bug数量
  const date = new Date();
  const todaytoday = date.getDate();
  const yesterDay = new Date();
  yesterDay.setDate(todaytoday - 1);
  yesterDay.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const twoDaybugList = yield bugModel.find({
    time: {
      $gte: yesterDay,
      $lte: date,
    },
  }).sort().exec((err, bugList) => {
    const yestroday = '';
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
    const todayStart = date.getTime();
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
