const projectModel = require('../models/projectModel.js');
const projectObj = {
  /**
   * 增加一个项目
   *
   */
  * add() {
    const param = this.request.body;
    const project = yield new projectModel(param).save();
    this.body = project;
  },
  /**
   * 展示项目列表
   *
   */
  * getProjectList() {
    const list = yield projectModel.find({}).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },
};
module.exports = projectObj;
