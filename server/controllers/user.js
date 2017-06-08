const userModel = require('../models/userModel.js');
const companyModel = require('../models/companyModel.js');
const sha512 = require('js-sha512');
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
  let user = this.request.body;
  const companyId = this.header.companyid;
  let isRepeat = false;
  let existUserName = false;
  let existEmail = false;
  // 需要先判断一下是否存在相同的用户名
  const userList = yield userModel.find({}, (err, res) => {
    if (err) {
      return;
    }
    return res;
  });
  isRepeat = false; //比如盛星大哥既有自己的公司，但是也是bugWatch开源团队的，所以不做重复校验
  
  userList.forEach((item, index, array) => {
    if (item.name === user.name) {
      isRepeat = true;
      existUserName=true;
    }
    if (item.email === user.email) {
      existEmail = true;
      isRepeat = true;
    }
  });
  if (isRepeat) {
    if(existUserName&&existEmail) {
    this.body = '该用户名、邮箱已经存在，请重新申请';
    } else if (existUserName) {
      this.body = '该用户名已经存在，请重新申请';
    } else {
      this.body = '该邮箱已经存在，请重新申请';
    }
  } else {
    console.log('before-password', user.password);
    user.password = sha512(user.password);
    console.log('password512', user.password.toString());
    const newUser = yield userModel(user).save();
    let addUserToCompany = yield companyModel.update({
      _id: companyId,
    }, {
      $push: {
        userList: {
          roleId: 2,
          userId: newUser._id
        },
      },
    });
    newUser.password = '****';
    this.body = newUser;
  }
  
};
/* 用户登录 */
exports.login = function*(ctx) {
  const body = this.request.body;
  let password = sha512(body.password);
  let user = yield userModel.findOne({
    name: body.name,
    password: password
  }).lean().exec((err, res) => {
    if (err) {
      return '登录失败lala';
    }

    if (res) {
      if (!res._id) {this.body = '没有这个用户';}
      const user = res;

      return { name: user.name, _id: user._id};
    }
    return '用户名或者密码有误';
  })

  // 查找该用户相关的信息
  // console.log('user', user);
  if (user == null) {
    user = {
      errorCode: 1,
      message: '登录失败，请确认你的账号和密码是否正确',

    };
  } else {
    let company = yield companyModel.findOne(
      {
        $or: [
          {ownerId: user._id},
          {
            'userList.userId': {
              $in: [user._id],
            }
          }

        ]
      }
    ).lean().exec((err, res) => {

     if (err) this.body = err;
      return res;
    })
    if (company) {
      user.companyId = company._id;
      // 查找出这个用户在这家公司的权限等级
     company.userList.forEach(item => {
        let userId = user._id + '';

       if (item.userId == userId) {
         user.gradeId = item.gradeId;
         return;
       }
      })
    }

    if (company) {
       user.companyId = company._id;
    } else { // 用户还没有公司，推荐它去创建公司
      user.companyId = '';
    }

  }
  delete user.password;
  this.body = user;
};

