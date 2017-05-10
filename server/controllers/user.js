const userModel = require('../models/userModel.js');
const companyModel = require('../models/companyModel.js');
const projectModel = require('../models/projectModel.js');

exports.searchuser = function*() {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) {
      return;
    }
  });
};
exports.getUserList = function*() {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) {
      return;
    }
  });
};
/**
 * 添加一个新用户
 */
exports.addUser = function*() {
  const user = this.request.body;
  let isRepeat = false;
  // 需要先判断一下是否存在相同的用户名
  const userList = yield userModel.find({}, (err, res) => {
    if (err) {
      return;
    }
    return res;
  });
  userList.forEach((item, index, array) => {
    if (item.name == user.name) {
      isRepeat = true;
      
      
    }
  });
  if (isRepeat) {
    this.body = '该名字的用户名已经存在，请重新申请';
  } else {
    const newUser = yield userModel(user).save();
    newUser.password = '****';
    this.body = newUser;
  }
  
};
/* 用户登录 */
exports.login = function*(ctx) {
  const body = this.request.body;
  let result = yield userModel.findOne(body).lean().exec((err, res) => {
    if (err) {
      return '登录失败lala';
    }
    if (res) {
      if (!res._id) {this.body = '没有这个用户';}
      const user = res;
      return {name: user.name};
    }
    return '用户名或者密码有误';
  })
  if (result == null) {
    result = {
      errorCode: 1,
      message: '登录失败，请确认你的账号和密码是否正确',
    };
  } else {
    let company = yield companyModel.findOne({ownerId: result._id}).exec((err, res) => {
      console.log('查找这家用户是哪家公司的', res);
      return res;
    })
    console.log('company', company);
    result.companyId = company._id;
  }
  this.body = result;
};

