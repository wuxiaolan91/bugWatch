var mongoose = require('mongoose');
// var DB_URL = 'mongodb://admin:111111127.0.0.1:27017/bug';
var DB_URL = 'mongodb://admin:111111@ds137230.mlab.com:37230/bugwatch';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    var Bug = mongoose.model('Bug', { name: String });

    var bug = new Bug({ name: 'undefined abc' });
    bug.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('bug保存成功了');
      }
    });
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.error('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;