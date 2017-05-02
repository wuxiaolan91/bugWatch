const projectModel = require('../models/projectModel.js');
const userModel = require('../models/userModel.js');
const projectObj = {
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
  /**
   * 增加一个项目
   *
   */
  * addProject() {
    const param = this.request.body;
    const project = yield new projectModel(param).save();
    this.body = project;
  },
  /**
  * 获取一个项目
  * @param projectId {String} 项目id
  */
  * getProjectById() {
    const id = this.query.projectId;
    const userIdList = [];
    console.log('id', id);
    const project = yield projectModel.findOne({
      _id: id,
    }).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;

      data.userList.map((item) => {
        userIdList.push(item.userId);
      });

      return data;
    });
    const userList = yield userModel.find({
      _id: userIdList,
    }, (err, res) => {
      console.log('userList - res', res);
      if (err) return err;
      return res;
    });
    project.userList = userList;
    this.body = project;
  },
  /**
   * 更新项目信息
   * @param {String} projectId 项目id
   * 
   */
  * updateProject () {
    console.log('更新')
    const projectId = this.header.projectid;
    const project = yield projectModel.findOne({
      _id: projectId,
    }).sort({ _id: -1 }).exec((err, data) => {
      if (err) return err;
      return data;
    });
    const result = '';
    // const result = yeild projectModel.update({
    const newProject = yield projectModel.remove({projectId}, (err, data) => {
        if (err) this.body = err;

        this.body = data;
    })
  },
  /**
   * 删除一个项目
   *
   */
  * removeProjectById() {

    const projectId = this.header.projectid;
    // const projectId = this.query.projectId;
    const newProject = yield projectModel.remove({
      projectId,
    }, (err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },

};
module.exports = projectObj;
