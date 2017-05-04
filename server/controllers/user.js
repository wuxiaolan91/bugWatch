const userModel = require('../models/userModel.js');
const companyModel = require('../models/companyModel.js');
const projectModel = require('../models/projectModel.js');

exports.searchuser = function* () {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) return;
  });
};
exports.getUserList = function* () {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) return;
  });
};
/**
 * 添加一个新用户
 */
exports.addUser = function* () {
  const user = this.request.body;
  let isRepeat = false;
  // 需要先判断一下是否存在相同的用户名
  const userList = yield userModel.find({}, (err, res) => {
    if (err) return;
    return res;
  });
  userList.forEach((item, index, array) => {
    if (item.name == user.name) {
      isRepeat = true;

      return;
    }
  })
  if (isRepeat) {
    this.body = '该名字的用户名已经存在，请重新申请';
  } else {
    let newUser = yield userModel(user).save();
    newUser.password = '****';
    this.body = newUser;
  }

};
/* 用户登录 */
exports.login = function* (ctx) {
  const body = this.request.body;
  let result = yield userModel.findOne(body, (err, res) => {
    if (err) {
      console.log('47')
      return  '登录失败lala';
    }
    if (res) {
      console.log('res', res)
     if (!res._id) {
       console.log('没有啊')
       this.body = '没有这个用户';
     }
      const user = res;
      return {
        name: user.name,
      };
    } else {
      return  '用户名或者密码有误';
    }
  });
  if (result == null) {
    result = {
      errorCode: 1,
      message: '登录失败，请确认你的账号和密码是否正确'
    };
  };
  this.body = result;
};

