const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const router = require('koa-router')();

// router
const bugController = require('../controllers/bug.js');
const ajaxController = require('../controllers/ajax.js');
const userController = require('../controllers/user.js');
const ruleController = require('../controllers/rule.js');
const projectController = require('../controllers/project.js');
// project

router.post('/project/addProject', projectController.addProject);
router.get('/project/removeProject', projectController.removeProject);
router.get('/project/getProjectList', projectController.getProjectList);
const user = require('../controllers/user');

// bug
router.get('/bug/addBug', bugController.addBug);
router.get('/bug/email', () => {
  const email = require('../controllers/user');
});
router.get('/bug/getBugList', bugController.getBugList);
router.get('/bug/compareList', bugController.compareList);
router.get('/bug/pageTopList', bugController.weekBugList);
router.get('/bug/bugTopList', bugController.weekBugList);

// ajax
router.post('/bug/addAjaxWatch', ajaxController.report);
router.get('/bug/getAjaxList', ajaxController.list);
// router.get('/user', user.searchuser);
// router.post('/user/email', user.sendemail);

// user
router.post('/user/login', userController.login);
router.post('/user/addUser', userController.addUser);
// rule
router.post('/rule/addRule', ruleController.addRule);
router.get('/rule/removeRule', ruleController.removeRule);
router.get('/rule/getRuleList', ruleController.getRuleList);
app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
