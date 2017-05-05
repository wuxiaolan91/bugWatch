const companyModel = require('../models/companyModel.js');
const userModel = require('../models/userModel.js');
let companyObj = {
  getCompanyById() {

  },
  * addCompanyByCompanyName() {
    const companyName = this.request.body.companyName;
    let newCompany = {
      companyName: companyName,
      ownerId: this.header.userid,
      userList: [
        {
          userId: this.header.userid,
          roleId: 3
        }
      ]
    };
    console.log('company', newCompany);
    const result = yield new companyModel(newCompany).save();
    this.body = result;
  },
  * getCompanyById() {
    const companyId = this.header.companyid;
    let userIdList = [];
    let result = yield companyModel.findById(companyId).lean().exec((err, res) => {
       if (err) return err;
      console.log('res', res);
      return res;
    });;
    result.userList.map((item) => {
      userIdList.push(item.userId);
    });
    let userList = yield userModel.find({
      _id: userIdList,
    }).exec((err, docs) => {
      if (err) return err;
      return docs;
    });
    console.log('用户表的userList', userList);
    result.userList = userList;
    console.log('userList', result.userList);
    this.body = result;
  }
};
module.exports = companyObj;