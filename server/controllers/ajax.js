
const ajaxModel = require('../models/ajaxModel.js');

let ajaxObj = {
  /**
   * window.onerror监听到的bug上报
   * 
   */
  *report () {
    const param = this.query;
    const ajaxResult = yield new ajaxModel(param).save();
    this.body = ajaxResult;
  },
  /**
   * 显示bug列表
   * 
   */
  *list () {
    const query = this.query;
    const { currentPage, size, timeType } = query;
    const skip = (currentPage - 1) * size;
    const startTime = new Date();
    const endTime = new Date();
    switch (timeType) {
      case '7':
        startTime.setDate(startTime.getDate() - 7);
        break;
      case '30':
        startTime.setDate(startTime.getDate() - 30);
        break;
    }
    startTime.setHours('00', '00', '01');
    endTime.setHours('23', '59', '59');

    const filterObj = {
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
    if (query.url) {
      filterObj.url = new RegExp(query.url);
    }
    const ajaxList = yield ajaxModel.find(filterObj).sort({ _id: -1 }).skip(skip).limit(10).exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    });

    this.body = {
      bugList: ajaxList,
    };
  },
};
module.exports = {
  report: ajaxObj.report,
  list: ajaxObj.list,
};
