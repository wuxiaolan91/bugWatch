const bugModel = require('../models/bugModel.js');
const ruleModel = require('../models/ruleModel.js');
const util = require('../lib/util.js');
const email = require('./email.js');
/**
 * 按照每个时间段筛选出昨天和今天的bug列表
 * @param {Array} bugList
 * @return 返回筛选后的一天之中每个小时的bug数量
 */
const getListByEveryHour = (bugList) => {
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
 * 按照筛选条件得到bug列表
 *
 * @param {String} type ：page（按照报错类型得到排行榜），bug（按照错误类型得到排行榜）
 * @param {List} bugList
 * @returns 返回一个对象，对象里有2个列表，1.类型列表，比如页面列表，或者bug类型列表2每一个项目代表的数量列表
 */
function bugListByFilter(type, bugList) {
  const pageListObj = {}; // 错误的页面
  const chartPageList = []; // 最后传给echarts的数据
  const chartCountList = []; // 图表里需要的报错页面数组
  console.log('bugList', bugList);
  bugList.forEach((item) => {
    const page = type == 'page' ? item.errorPage : item.message;
    pageListObj[page] = typeof pageListObj[page] === 'undefined' ? 1 : pageListObj[page] + 1;

  });
  const pageList = [];
  for (const key in pageListObj) { // 把数组变成对象，方便之后判断这个错误页面有没有
    pageList.push({
      url: key,
      count: pageListObj[key],
    });
  }

  const len = pageList.length;
  for (let i = 0; i < len; i++) { // 按照bug类型的多少进行排序。出现次数多的排在前面
    for (let j = 0; j < len - 1 - i; j++) {
      if (pageList[j].count < pageList[j + 1].count) {  // 相邻元素两两对比
        const temp = pageList[j + 1];  // 元素交换
        pageList[j + 1] = pageList[j];
        pageList[j] = temp;
      }
    }
  }
  pageList.length = 5;
  pageList.forEach((item) => { // 因为echarts是俩个对象的data需要数据，所以这里筛选出俩个数组出来，好传给echarts
    chartPageList.push(item.url);
    chartCountList.push(item.count);
  });
  return {
    chartPageList,
    chartCountList,
  };
}
/**
 * 添加一个bug
 */
exports.addBug = function* () {
  const ip = this.request.ip;
  const website = this.request.headers.website;
  const projectId = this.header.projectid;
  // 获取规则列表

  const ruleList = yield ruleModel.find({
    projectId
  }).sort({ _id: -1 }).exec((err, data) => {
    if (err) this.body = err;
    return data;
  });
  console.log('ruleList', ruleList);
  const bugObj = {
    projectId: this.header.projectid, // 加这个字段是为了一个Team要同时监测多个网站的错误做区分用的
    ip,
    errorPage: this.query.pageUrl,
    refferPage: '',
    message: this.query.message,
    error: this.query.error,
    ua: this.request.header['user-agent'],
    date: this.query.time,
  };
  bugObj.ua = util.getPlatform(bugObj.ua) + ':' + bugObj.ua;
  ruleList.forEach((item, index) => {
    if (bugObj.errorPage.indexOf(item.keyword[0]) > -1) {
      console.log('调用邮件发布', item.email);
      const mailOptions = {
        from: '15600018324@163.com', // sender address
        to: item.email, // list of receivers
        subject: `报错啦，来自 bugWatch 的邮件：${bugObj.errorPage}报错信息：${bugObj.message}`, // Subject line
        text: `${bugObj}报错啦：${bugObj.message}`, // plaintext body
        html: `<h2>报错网站：</h2><p>${website}</p>
        <h2>页面地址：</h2><p>${bugObj.errorPage}</p>
        <h2>报错时间：</h2><p>${bugObj.date}</p>
        <h2>报错堆栈信息</h2><p style="color:red;">${bugObj.error}</p>
        <h2>报错ua：</h2><p>${bugObj.ua}</p>`, // html body
      };
      email.sendemail(mailOptions);
    }
  })
  if (ruleList.length < 1) {
    console.log('没有匹配的规则');
  }
  const bug = yield new bugModel(bugObj).save();
  this.body = bug;
};
/**
 * 得到bug列表
 */
exports.getBugList = function* () { // 获取bug列表，还没有哪个地方用到
  const query = this.query || {};
  const projectId = this.header.projectid;
  const currentPage = query.currentPage;
  const size = query.size;
  const timeType = query.timeType;
  let skip = currentPage - 1;
  skip *= size;
  const startTime = new Date();
  const endTime = new Date();
  const diffTime = startTime.getDate() - timeType;
  startTime.setDate(diffTime);
  startTime.setHours('00', '00', '01');
  endTime.setHours('23', '59', '59');
  const filterObj = {
    projectId,
    time: {
      $gte: new Date(startTime),
      $lte: new Date(endTime),
    },
  };
  if (query.errorPage) {
    filterObj.errorPage = new RegExp(query.errorPage);
  }
  if (query.errorKeyword) {
    filterObj.message = new RegExp(query.errorKeyword);
  }

  const bugList = yield bugModel.find(filterObj).sort({ _id: -1 }).skip(skip).limit(10).exec((err, bugList) => {
    if (err) {
      return console.error(err);
    }
    return bugList;
  });
  const totalLength = yield bugModel.find(filterObj).count();
  this.body = {
    bugList,
    totalLength,
  };
};
/*
 *  得到本周所有的bug列表
 */
exports.weekBugList = function* () { // 显示一周内报错最多的页面
  const projectId = this.header.projectid;
  const type = this.query.type;
  const date = new Date(); // 今天
  const sevenDayStart = new Date();
  sevenDayStart.setDate(date.getDate() - 7);
  sevenDayStart.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const twoDaybugList = yield bugModel.find({
    projectId,
    time: {
      $gte: sevenDayStart,
      $lte: date,
    },
  }).sort().exec((err, bugList) => {
    console.log('获取本周bug列表- 查询返回')
    this.body = bugListByFilter(type, bugList);
  });
  console.log('会执行到这里嘛？175')
};
/**
 * 得到昨天和今天每个小时段的bug数量列表
 */
exports.compareList = function* () { // 显示昨天和今天每个时间段的bug数量
  const date = new Date();
  const todaytoday = date.getDate();
  const yesterDay = new Date();
  yesterDay.setDate(todaytoday - 1);
  yesterDay.setHours('00', '00', '01');
  date.setHours('24', '00', '00');
  const projectId = this.header.projectid;
  const twoDaybugList = yield bugModel.find({
    projectId,
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
