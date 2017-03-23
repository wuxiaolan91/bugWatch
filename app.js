const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

app.use(router.routes())
  .use(router.allowedMethods());
app.use(bodyParser());

router.get('/', function* (next) {
  console.log('我是首页');
  this.body = 'Hello World';
});
router.get('/getBugList', function* (next) {
  this.body = this.request;
  console.dir(this.body);
});


app.on('error', (err, ctx) => {
  console.log('Koa服务开启失败', err);
});

app.listen(3000, () => {
  console.log('Koa 服务开启');
});
