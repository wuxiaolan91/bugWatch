const ruleModel = require('../models/ruleModel.js');
/**
 * 添加一条新规则
 */
const ruleObj = {
  /**
   * 获取规则列表
   * 
   */
  * getRuleList () {
    const list = yield ruleModel.find({}).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },
  * addRule () {
    const param = this.request.body;
    const newRule = yield new ruleModel(param).save();
    this.body = newRule;
  },
  * removeRule () {
    const ruleId = this.request.body.ruleId;
    console.log('ruleId', ruleId);
    const newRule = yield ruleModel.remove(ruleId, (err, data) => {
      if (err) this.body = err;
      console.log('del success')
      this.body = data;
    })
  }

};
module.exports = ruleObj;
