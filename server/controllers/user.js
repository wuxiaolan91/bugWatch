const userModel = require('../models/userModel.js');

exports.searchuser = function* () {
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
  this.body = yield userModel.find(body, (err, res) => {
    console.log('登录接口返回');
    if (err) {
      return '登录失败';
    }
    if (res.length) {
      const user = res[0];
      this.body = {
        name: user.name,
      };
    } else {
      this.body = '用户名或者密码有误';
    }
  });
};

