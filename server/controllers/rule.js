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
    const projectId = this.header.projectid;
    const list = yield ruleModel.find({
      projectId
    }).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },
  * addRule () {
    const param = this.request.body;
    param.projectId = this.header.projectid;
    const newRule = yield new ruleModel(param).save();
    this.body = newRule;
  },
  * removeRule () {
    
    const projectId = this.header.projectid;
    const ruleId = this.query.ruleId;
    console.log('body', this.query.ruleId);
    console.log('ruleId--', this.request);
    const newRule = yield ruleModel.remove({
      projectId: projectId,
      _id: ruleId
      }, (err, data) => {
      if (err) this.body = err;
      console.log('del success')
      this.body = data;
    })
  }

};
module.exports = ruleObj;
