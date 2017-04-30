const projectModel = require('../models/projectModel.js');
const projectObj = {
  /**
   * 增加一个项目
   *
   */
  * addProject() {
    const param = this.request.body;
    const project = yield new projectModel(param).save();
    this.body = project;
  },
  * removeProject () {
    
    const projectId = this.header.projectid;
    // const projectId = this.query.projectId;
    const newProject = yield projectModel.remove(projectId, (err, data) => {
        if (err) this.body = err;
        this.body = data;
    })
  },
  /**
   * 展示项目列表
   *
   */
  * getProjectList () {
    const list = yield projectModel.find({}).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },
};
module.exports = projectObj;
