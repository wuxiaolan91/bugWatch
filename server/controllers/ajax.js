const ajaxModel = require('../models/ajaxModel.js');

var ajaxObj = {
  report: function* () {
    let param = this.query;
    console.log('param');
    console.dir(param);
    const ajaxResult = yield new ajaxModel(param).save();
    this.body = ajaxResult;
  }, list: function* (param) {
    const query = this.query;
  const currentPage = query.currentPage;
  const size = query.size;
  const skip = (currentPage - 1) * size;
  const timeType = query.timeType;
  console.log('timeType' + timeType);
  const startTime = new Date();
  const endTime = new Date();
  switch (timeType) {
    case '7':
      console.log('7')
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
    const ajaxList = yield ajaxModel.find(filterObj).sort({ _id: -1 }).skip(skip).limit(10).exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    })
    
    this.body = {
      bugList: ajaxList
    };
  }
}
module.exports = {
  report: ajaxObj.report,
  list: ajaxObj.list
}