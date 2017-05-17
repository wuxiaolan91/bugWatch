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
    const list = yield projectModel.find(findObj).sort({_id: -1}).exec((err, data) => {
      if (err) {
        this.body = err;
      }
      this.body = data;
    });
  },
  /**
   * 增加一个项目
   *
   */
    * addProject() {
    const companyId = this.header.companyid;
    const param = this.request.body;
    const project = yield new projectModel(param).save();
    const result = yield companyModel.update({
      _id: companyId,
    }, {
      $push: {
        projectList: project._id,
      },
    }).exec((err, res)=> {
      return res;
    });

    let company = yield companyModel.findById(companyId).lean().exec((err, res) => {
      if (err) {
        return err;
      }
      // console.log('res', res);
      return res;
    });
    console.log('///////// Company ??????????????');
    console.log(company);
    this.body = company; //project;
  },
  /**
   * 获取一个项目
   * @param projectId {String} 项目id
   */
    * getProjectById() {
    const projectId = this.query.projectId || this.header.projectid;
    let userIdList = [];
    let project = yield projectModel.findOne({
      _id: projectId,
    }).sort({_id: -1}).lean().exec((err, data) => {
      if (err) {
        this.body = err;
      }
      if (!data) {
        this.body = [];
        return;
      }
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
      if (err) {
        return err;
      }
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
    if (!project) {
      this.body = null;
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
    const projectId = this.query.projectId || this.header.projectid;
    const userId = this.query.userId;
    const roleId = this.query.roleId;
    const userName = this.query.name;
    const newUser = {
      userId,
      roleId,
    };
    let project = yield projectModel.findOne({
      _id: projectId,
    }).sort({_id: -1}).lean().exec((err, data) => {
      if (err) {
        return err;
      }
      return data;
    });

    let user = yield userModel.findOne({
      _id:userId
    }).sort({_id:-1}).exec((err,user)=>{
      if (err) {
        return err;
      }

      return user;
    })

    // project.userList.push(newUser);
    const result = yield projectModel.update({
      _id: projectId
    }, {
      $push: {
        userList: newUser
      }
    }).exec((err, res) => {
      if (err) {
        return err;
      }

      return res
    });
    console.log(user)
    if (result.ok) {
      this.body = Object.assign({},newUser,{email:user.email,gradeId:user.gradeId, name:user.name})
    } else {
      this.body = null;
    }


  },

  * delUserFromProject() {
    const projectId = this.query.projectId;
    const userId = this.query.userId;
    const roleId = this.query.roleId;

    const newUser = {
      userId,
      roleId,
    };

    const project = yield projectModel.findOne({
      _id: projectId,
    }).sort({_id: -1}).exec((err, data) => {
      if (err) {
        return err;
      }
      return data;
    });

    project.userList.forEach((item, index) => {
      if (item.roleId == newUser.roleId && item.userId == newUser.userId) {
        const user = project.userList.splice(index, 1);
      } else {

      }
    });

    const result = yield projectModel.update({_id: projectId}, project, (err, res) => {
      if (err) {
        return err;
      }

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
    if (!projectId) {
      this.body = '请输入要删除的项目id';
    }

    let company = yield companyModel.findOne({
      _id: this.query.companyId
    }).sort({_id: -1}).exec((err, data) => {
      if (err) {
        // this.body = err;
        return err;
      }
      // this.body = data;

      return data;
    });
    console.log('>>>>>>>>>>>>>>> company <<<<<<<<<<<<<');
    console.log(company);
    console.log('>>>>>>>>>>>>>>> company.projectList <<<<<<<<<<<<<');
    console.log(company.projectList);
    company.projectList.forEach((item, index) => {
      if (item == projectId) {
         company.projectList.splice(index, 1);
      } else {

      }
    });

    const result = yield companyModel.update({
      _id: company._id
    }, company).exec((err, res) => {
      if (err) {
        return err;
      }
      return res;
    });

    const newProject = yield projectModel.remove({
      _id: projectId,
    }, (err, data) => {
      if (err) {
        this.body = err;
      }
      this.body = data;
    });

    this.body = newProject;
    // Chi
  }
};
module.exports = projectObj;
