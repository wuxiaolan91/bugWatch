const router = require('./server/router')
const mongoose = require('mongoose');
const config = require('./server/config')


// const list = require("./controllers/list.js");
// const mongo = require('./models/db.js');
const app = require('./server/router')

// app.use(bodyParser());

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
  console.log('连接成功');

});
