const userModel = require('../models/userModel.js');
const companyModel = require('../models/companyModel.js');
const sha512 = require('js-sha512');

exports.getUserList = function* () {
  this.body = yield userModel.find({}, (err, res) => {
    if (err) {
      
    }
  });
};
/**
 * 添加一个新用户
 */
exports.addUser = function* () {
  const userReq = this.request.body;
  const companyId = this.header.companyid;
  let isRepeat = false;
  // 需要先判断一下是否存在相同的用户了
  let user = yield userModel.findOne({
    '$or': [{
      name: userReq.name,
    },
    { email: userReq.email }
    ],
  }).lean().exec((err, result) => {
    if (err) {
      console.error(err);
      return err;
    }  else {
      if (result) isRepeat = true;
      console.log('finduserReq', result || {});
      return result;
    }
  });
  if (isRepeat) { // 已经存在该用户或者邮箱了
    if (userReq.name == user.name) {
      this.body = '该用户名已经存在，请重新申请';
    } else if (userReq.email == user.email) {
      this.body = '该邮箱已经存在，请重新申请';
    } else {
      this.body = '用户重复了?'
    }
  } else {
    userReq.password = sha512(userReq.password);
   
    let newUser = yield userModel(userReq).save();
    const addUserToCompany = yield companyModel.update({
      _id: companyId,
    }, {
      $push: {
          userList: {
            roleId: 2,
            userId: newUser._id,
          },
        },
    });
    newUser.password = '****';
    this.body = newUser;
  }
};
/* 用户登录 */
exports.login = function* (ctx) {
  const body = this.request.body;
  const password = sha512(body.password);
  console.log('密码-----', password);
  let user = yield userModel.findOne({
    name: body.name,
    password,
  }).lean().exec((err, res) => {
    if (err) {
      return '登录失败lala';
    }

    if (res) {
      if (!res._id) { this.body = '没有这个用户'; }
      const user = res;

      return { name: user.name, _id: user._id };
    }
    return '用户名或者密码有误';
  });

  // 查找该用户相关的信息
  // console.log('user', user);
  if (user == null) {
    user = {
      errorCode: 1,
      message: '登录失败，请确认你的账号和密码是否正确',

    };
  } else {
    const company = yield companyModel.findOne(
      {
        $or: [
          { ownerId: user._id },
          {
            'userList.userId': {
              $in: [user._id],
            },
          },

        ],
      },
    ).lean().exec((err, res) => {
      if (err) this.body = err;
      return res;
    });
    if (company) {
      user.companyId = company._id;
      // 查找出这个用户在这家公司的权限等级
      company.userList.forEach((item) => {
        const userId = `${user._id  }`;

        if (item.userId == userId) {
          user.gradeId = item.gradeId;
          return;
        }
      });
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

