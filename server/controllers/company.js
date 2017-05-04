const companyModel = require('../models/companyModel.js');
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
    console.log('companyId', companyId)
    const result = yield companyModel.findById(companyId, (err, res) => {
      if (err) return err;
      console.log('res', res);
      return res;
    });
    this.body = result;
  }
};
module.exports = companyObj;