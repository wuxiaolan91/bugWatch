const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();


router.get('/', function* (next) {
  console.log('我是首页');
  this.body = 'Hello World';
});
router.get('/getBugList', function* (next) {
  console.log('我是api');
  this.body = 'Hello Api';
});
app.use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log('Koa服务开启失败', err);
});

app.listen(3000, () => {
  console.log('Koa 服务开启');
});
