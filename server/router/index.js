const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const router = require('koa-router')();

// router
const bugController = require('../controllers/bug.js');
const ajaxController = require('../controllers/ajax.js');
const userController = require('../controllers/user.js');
// project
const projectController = require('../controllers/project.js');
router.post('/project/add', projectController.add);
router.get('/project/list', projectController.list);
const user = require('../controllers/user');

// bug
router.get('/bug/watch', bugController.bugWatch);
router.get('/bug/email', () => {
  const email = require('../controllers/user');
});
router.get('/bug/addWatch', bugController.bugWatch);
router.get('/bug/getList', bugController.getList);
router.get('/bug/compareList', bugController.compareList);
router.get('/bug/pageTopList', bugController.weekBugList);
router.get('/bug/bugTopList', bugController.weekBugList);
router.get('/bug/addAjaxWatch', ajaxController.report);
router.get('/bug/getAjaxList', ajaxController.list);
// router.get('/user', user.searchuser);
// router.post('/user/email', user.sendemail);

// user
router.post('/user/login', userController.login);

app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
