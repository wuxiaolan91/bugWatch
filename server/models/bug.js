const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  errorPage: String, // 报错的页面
  refferPage: String, // 报错的页面的上一个页面
  message: String, // window.onerror函数里的message
  error: String, //  报错的堆栈信息
  ua: String, // 报错页面的user-agent
  time: { // 报错的时间
    type:Date, default:Date.now
  }, 
});
const bug = mongoose.model('Bug', bugSchema);
module.exports = bug;
