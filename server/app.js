const Koa = require('koa');
const app = new Koa();
// const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const mongoose = require('mongoose');

const config = require('./config');

const bugController = require('./controllers/bug.js');
const ajaxController = require('./controllers/ajax.js');
// const list = require("./controllers/list.js");
// const mongo = require('./models/db.js');
router.get('/bug/addWatch', bugController.bugWatch);
router.get('/bug/getList', bugController.getList);
router.get('/bug/compareList', bugController.compareList);
router.get('/bug/pageTopList', bugController.weekBugList);
router.get('/bug/bugTopList', bugController.weekBugList);
router.get('/bug/addAjaxWatch', ajaxController.report);
router.get('/bug/getAjaxList', ajaxController.list);
app.use(router.routes());
app.use(router.allowedMethods());
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
  console.log('数据库连接成功');
});

