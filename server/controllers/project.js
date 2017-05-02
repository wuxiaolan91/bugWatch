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
      console.log('data-project信息', data);
      if (data.userList) {
        data.userList.map((item) => {
          userIdList.push(item.userId);
        });
      }

      return data;
    });
    let userList = yield userModel.find({
      _id: userIdList,
    }, (err, res) => {
      if (err) return err;
      return res;
    });
    let newUserList = [];
    for (let i = 0; i< userList.length; i++){
      let item = userList[i];
      let roleId = '';
      project.userList.forEach(user => {
        if (item._id == user.userId) {
          roleId = user.roleId;
         console.log('roleId',  user.roleId);
          item.roleId = user.roleId;
        } else {
          console.log('不相等');
        }
      });
      console.log('item -- old', item);
      item.ageId = 55;
      console.log('item -- new', item);
      newUserList.push(item);
    };
    console.log('userList--新的呢', newUserList);
    project.userList = userList;
    this.body = project;
  },
  /**
   * 更新项目信息,比如给项目添加一个用户
   * @param {String} projectId 项目id
   *
   */
  * updateProject() {
    const projectId = this.query.projectId;
    const userId = this.query.userId;
    const roleId = this.query.roleId;
    const newUser = {
      userId,
      roleId,
    };
    const project = yield projectModel.findOne({
      _id: projectId,
    }).sort({ _id: -1 }).exec((err, data) => {
      if (err) return err;
      return data;
    });
    console.log('proejct', project);
    project.userList.push(newUser);
    const result = yield projectModel.update({ _id: projectId }, project, (err, res) => {
      if (err) return err;
      console.log('res', res);
      return res;
    });

    this.body = result;
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
