# bugwatch

> 监测bug报错平台
## 技术栈：
- Vue2系列： Vue2 + Vue-router
- 接口请求： Axios
- 数据库: MongoDB, Mongoose(驱动 MongoDB 的，大家可以多了解下怎么用这个取数据，存数据)
- Koa： Koa2（主要用来写接口）， Koa-Router（koa一个方便的处理地址栏路径的插件）， koa-bodyparser（解析post请求数据的插件）
- 接口转发配置在 **config/index** 里的 proxyTalbe
- 本地调试接口请另外开一个控制台 输入 node app.js

-----
## 项目结构
### 前端

- **src** 前端代码在 
- **static** 静态资源
- **router/index.js** 前端页面的路由，要加前端页面的请记住要到这里配置
- **config** **build** 项目的构建代码
### 后端
- **app.js**  后端服务的启动代码
- **server** 后端代码主要放在这里
	- **server/controller**  前端直接访问的接口主要定义在这里
	- **server/models**  **Schema**  （Schema不知道的话可以把它理解为数据库的表的字段的定义）定义

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
