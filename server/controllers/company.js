const companyModel = require('../models/companyModel.js');
const userModel = require('../models/userModel.js');

const projectModal = require('../models/projectModel');

let companyObj = {
  getCompanyById() {
    
  },
  * addCompanyByCompanyName() {
    const companyName = this.request.body.companyName;
    const existCompany = yield companyModel.findOne({companyName: companyName}).lean().exec((err, res) => {
      if (err) {
        return err;
      }
      // console.log('res', res);
      return res;
    });
    
    console.log(existCompany);
    if (!existCompany) {
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
      const result = yield new companyModel(newCompany).save();
      this.body = result;
    } else {
      this.body = "该公司名称已存在，请重新申请";
    }
  },
  * getCompanyById() {
    const companyId = this.header.companyid;
    let userIdList = [];
    let company = yield companyModel.findById(companyId).lean().exec((err, res) => {
      if (err) {
        return err;
      }
      // console.log('res', res);
      return res;
    });
    if (!company) {
      this.body = null;
      return;
    }
    company.userList.map((item) => {
      userIdList.push(item.userId);
    });
    let userList = yield userModel.find({
      _id: userIdList,
    }).exec((err, docs) => {
      if (err) {
        return err;
      }
      return docs;
    });
    company.userList = userList;
    
    console.log('===============userIdList===============');
    console.log(userIdList);
    let projectList = yield projectModal.find({
      'userList.userId': {
        $in: userIdList,
      }
    }).exec((err, docs) => {
      if (err) {
        return err;
      }
      return docs;
    });
    
    company.projectList = projectList;
    
    this.body = company;
  }
};
module.exports = companyObj;
