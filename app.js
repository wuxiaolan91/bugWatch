const Koa = require('koa');
const app = new Koa();
// const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const mongoose = require('mongoose');

const bugController = require('./server/controllers/bug.js');
// const list = require("./controllers/list.js");
// const mongo = require('./models/db.js');
router.get('/bug/watch', bugController.bugWatch);

app.use(router.routes());
app.use(router.allowedMethods());

// app.use(bodyParser());

app.on('error', (err, ctx) => {
  console.log('Koa服务开启失败', err);
});

app.listen(3000, () => {
  console.log('Koa 服务开启');
});

const DB_URL = 'mongodb://admin:111111@localhost:27017/bugWatch?readPreference=primary';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', () => {
  console.log('连接成功');

});
