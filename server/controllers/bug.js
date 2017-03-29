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
/**
  * 根据类型，获取错误列表
  */
function bugListByFilter(type, bugList) {
  const pageListObj = {}; // 错误的页面
  const chartPageList = []; // 最后传给echarts的数据
  const chartCountList = []; // 图表里需要的报错页面数组
  bugList.forEach((item) => {
    const page = type == 'page' ? item.errorPage : item.message;
    pageListObj[page] = typeof pageListObj[page] === 'undefined' ? 1 : pageListObj[page] + 1;

  });
  let pageList = [];
  for (const key in pageListObj) { // 把数组变成对象，方便之后判断这个错误页面有没有
    pageList.push({
        url: key,
        count: pageListObj[key],
      });
  }

  let len = pageList.length;
  for (let i = 0; i < len; i++) { // 按照bug类型的多少进行排序。出现次数多的排在前面
    for (let j = 0; j < len - 1 - i; j++) {
        if (pageList[j].count < pageList[j + 1].count) {  // 相邻元素两两对比
            let temp = pageList[j + 1];  // 元素交换
            pageList[j + 1] = pageList[j];
            pageList[j] = temp;
          }
      }
  }
  pageList.length = 5;
  pageList.forEach((item) => {
    chartPageList.push(item.url);
    chartCountList.push(item.count);
  });
  return {
    chartPageList,
    chartCountList,
  };
}
const getListByErrorPage = (bugList) => { // 按照每个时间段筛选出昨天和今天的bug列表

};
/**
 * bugWatch
 */
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
/*
 *  BugList
 */
exports.weekBugList = function* () { // 显示一周内报错最多的页面
  let type = this.query.type;
  const date = new Date(); // 今天
  const sevenDayStart = new Date();
  sevenDayStart.setDate(date.getDate() - 7);
  sevenDayStart.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const twoDaybugList = yield bugModel.find({
    time: {
      $gte: sevenDayStart,
      $lte: date,
    },
  }).sort().exec((err, bugList) => {
    this.body = bugListByFilter(type, bugList);
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
