const companyModel = require('../models/companyModel.js');
const projectModel = require('../models/projectModel.js');
const userModel = require('../models/userModel.js');
const projectObj = {
  /**
  * 展示项目列表
  *
  */
  * getProjectList() {
    let findObj = {};
    const userId = this.query.userId;
    if (userId) {

      findObj = {
        'userList.userId': {
          $in: [userId],
        },
      };
    }
    const list = yield projectModel.find(findObj).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      this.body = data;
    });
  },
  /**
   * 增加一个项目
   *
   */
  * addProject() {
    let companyId = this.header.companyid;
    const param = this.request.body;
    const project = yield new projectModel(param).save();
    const result = yield companyModel.update({
      _id: companyId
    }, {
      $push: {
        projectList: project._id
      }
    });
    this.body = project;
  },
  /**
  * 获取一个项目
  * @param projectId {String} 项目id
  */
  * getProjectById() {
    const projectId = this.query.projectId;
    const userIdList = [];
    const project = yield projectModel.findOne({
      _id: projectId,
    }).sort({ _id: -1 }).exec((err, data) => {
      if (err) this.body = err;
      if (!data) this.body = [];
      console.log('data', data)
      if (data.userList) {
        data.userList.map((item) => {
          userIdList.push(item.userId);
        });
      }
      return data;
    });
    // 拿到项目有关的用户列表的详细信息
    const userList = yield userModel.find({
      _id: userIdList,
    }).lean().exec((err, docs) => {
      if (err) return err;
      return docs;
    });
    const newUserList = [];
    for (let i = 0; i < userList.length; i++) {
      const item = userList[i];
      let roleId = '';
      project.userList.forEach((user) => {
        if (item._id == user.userId) {
          roleId = user.roleId;
          item.roleId = user.roleId;
        } else {
        }
      });
      newUserList.push(item);
    }
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

    const projectId = this.query.projectId;
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
