const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  projectId: String , // 报错的是哪个项目
  errorPage: {
    type: String,
    required: true 
  }, // 报错的页面
  refferPage: String, // 报错的页面的上一个页面
  message: {
    type: String,
    required: true 
  }, // window.onerror函数里的message
  error: String, //  报错的堆栈信息
  ua: {
    type: String,
    required: true 
  }, // 报错页面的user-agent
  time: { // 报错的时间
    type: Date,
    default: Date.now,
  },
});
const BugModel = mongoose.model('Bug', bugSchema);

module.exports = BugModel;
