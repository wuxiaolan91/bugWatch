const app = require('./router/index')
let config = require('./config')
const mongoose = require('mongoose')
app.on('error', (err, ctx) => {
  console.log('Koa服务开启失败', err);
});

app.listen(config.port, () => {
  console.log('Koa 服务开启');
});

/**
 * 连接
 */
mongoose.connect(config.mongo.DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', () => {
  console.log('数据库连接成功');
});

