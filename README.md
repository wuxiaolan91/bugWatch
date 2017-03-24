# bugwatch

> 监测bug报错平台
## 技术栈：
- Vue2系列： Vue2 + Vue-router
- 接口请求： Axios
- 数据库: MongoDB, Mongoose(驱动Mongoo的，大家可以多了解下怎么用这个取数据，存数据)
- Koa： Koa2（主要用来写接口）， Koa-Router（koa一个方便的处理地址栏路径的插件）， koa-bodyparser（解析post请求数据的插件）
- 接口转发配置在 ./config/index 里的 proxyTalbe
- 本地调试接口请另外开一个控制台 输入 node app.js

-----
## 项目结构
### 前端

- **./src ** 前端代码在 
-  **./static** 静态资源再
- **config** **build** 项目的构建代码
### 后端
- **./app.js**  后端服务的启动代码
- **./server** 后端代码主要放在这里
	- **server/controller**  前端直接访问的接口主要定义在这里
	- **server/models**  **Schema**  （Schema不知道的话可以把它理解为数据库的表的字段的定义）定义


在本地开发的时候
## MongoDB的使用
建议
1. 从http://pan.baidu.com/s/1jII90iU这里下载软件
2.  安装这个软件
3. 进入安装目录。安装目录一般是 C:\Program Files\MongoDB 或者 C:\Program Files (x86)\MongoDB 目录下。
4. 进入 MongoDB 目录下的 Server\3.2\bin 目录。双击 mongod.exe 程序。这个时候就算是启动成功Mongo了
5. 下载一个 MongoChef 程序（此程序用于连接Mongo和方便你操作数据库）
6. 点击 MongoChef 的 左上角的 Connect。
7. 点击弹出窗口的 New Connection新建一个连接。默认 Mongo 端口号是 27017
8. 进入连接以后， 在连接点击右键， 选择 'Add Database', 输入数据库的名字，按回车，数据库就建好了
9. 新建用户： 选择当前连接下的Admin数据库，再点击界面菜单栏的 "Users"， 或者用命令行建用户，就是进入 ”MongoDB"安装目录。然后输入（命令行建用户的方法可以忽略命令10）
```
	db.createUser({user : "admin",pwd  : "111111"
    ,roles : [
        {
            role : "userAdminAnyDatabase",
            db   : "admin"
        }
    ]
 })
```

10. 输入用户名和密码，点击回车。
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
