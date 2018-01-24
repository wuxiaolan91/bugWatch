
const app = require('./router/index')
let config = require('./config')
const mongoose = require('mongoose')
app.on('error', (err, ctx) => {
  console.log('Koa服务开启失败', err);
});

app.listen(config.port, () => {
  console.log('--------Koa 服务开启--------');
});

/**
 * 连接
 */
mongoose.connect(config.mongo.DB_URL, {useMongoClient: true});
const db = mongoose.connection;
/**
 * 连接成功
 */
db.once('open', () => {
  console.log('-----Mongoose connection success');
});
db.on('error', function (err) {
  console.error('-----Mongoose connection error: ' + err);
});

