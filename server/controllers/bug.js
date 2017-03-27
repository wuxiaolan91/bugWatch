const bugModel = require('../models/bugModel.js');

exports.bugWatch = function *() {
  console.log('接口拿到');
  const ip = this.request.ip;
  const bugObj = {
    ip,
    errorPage: this.query.pageUrl,
    refferPage: '',
    message: this.query.message,
    error: this.query.error,
    ua: this.request.header['user-agent'],
    date: this.query.time
  };

  const bug = yield new bugModel(bugObj).save();
  console.log('bug');
  console.log(bug);
  this.body = bug;
};

exports.list = function *() {
  const bugList = yield bugModel.find(function (err, bugList) {
    if (err) {
      return console.error(err);
    } else {
      return bugList;
    }
    // let bugList = yield new bugModel.find();
    
  })
this.body = bugList;
}
exports.compareList = function *() {
  const twoDaybugList = yield bugModel.find({
     time:{
      "$gte": new Date('2017-03-26T00:00:00'),
      "$lte": new Date('2017-03-26T24:00:00')
   }
  }).sort().exec(function (err, bugList) {
    var yestroday = '';
      if (err) {
        return console.error(err);
      } else {

        return bugList;
      }
    })
  this.body = twoDaybugList;
}
// router.get('/getBugList', function* (next) {
//   mongo.getBugList( function (bugList) {

//   })
// });
