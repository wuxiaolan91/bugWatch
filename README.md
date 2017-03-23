# bugwatch

> 监测bug报错平台
## 技术栈：
- Vue2系列： Vue2 + Vue-router
- 接口请求： Axios
- Koa： Koa2， Koa-Router， koa-bodyparser
- 接口转发配置在 ./config/index 里的 proxyTalbe
- 本地调试接口请另外开一个控制台 输入 node app.js

-----
## 项目结构
- 前端代码在 **./src **
- 后端代码现在主要在 **./app.js** ，建模等后端代码放在 **./server** 里
- 数据库连接放在 **./models/db.js**


在本地开发的时候

## Build Setup

``` bash
# install dependencies
npm install

## start server
node app.js

# serve with hot reload at localhost:8080 and open koa service.
npm run dev
# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
