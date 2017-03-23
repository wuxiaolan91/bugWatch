const app = require('koa')(),
      koa = require('koa-router')();
      
app.use(require('koa-bodyparser')());

app.use(function* (next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms); // 显示执行的时间
});

app.on('error', function(err, ctx){
  console.log('server error', err);
});

app.listen(3000, () => {
  console.log('Koa 服务开启');
});