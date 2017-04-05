const ajaxModel = require('../models/ajaxModel.js');

var ajaxObj = {
  report: function* (param) {
    const ajaxResult = yield new ajaxModel(param).save();
    this.body = ajaxResult;
  }, list: function* (param) {
    const ajaxList = yield ajaxModel.find({}).exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    })
    
    this.body = ajaxList;
  }
}
module.exports = {
  report: ajaxObj.report
}