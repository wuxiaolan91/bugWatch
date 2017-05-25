const Koa = require('koa');
let cors = require('kcors');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const whiteList = ['/bug/addBug', '/bug/addAjaxWatch'];  
app.use(bodyParser());
app.use(cors({
  origin (ctx) {
    const requestOrigin = ctx.accept.headers.origin;
    if (!ctx.request.header['access-control-request-method']) { return requestOrigin; } // 如果当前不是cors。那么不进行白名单校验
    console.log('ctx', ctx);
    const apiUrl = ctx.request.url;
    console.log('ctx', ctx);
     if (!whiteList.includes(apiUrl)) {
         ctx.throw(`🙈 ${apiUrl} is not a valid api`);
     }
     return requestOrigin;
  },
  allowMethods: 'POST,OPTIONS',
  allowHeaders : "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}
));
const router = require('koa-router')();

// router
const companyController = require('../controllers/company.js');
const bugController = require('../controllers/bug.js');
const ajaxController = require('../controllers/ajax.js');
const userController = require('../controllers/user.js');
const ruleController = require('../controllers/rule.js');
const projectController = require('../controllers/project.js');

// company
router.post('/company/addCompanyByCompanyName', companyController.addCompanyByCompanyName);
router.get('/company/getCompanyById', companyController.getCompanyById);

// user
router.get('/user/getUserList', userController.getUserList);
router.post('/user/login', userController.login);
router.post('/user/addUser', userController.addUser);

// project
router.get('/project/getProjectList', projectController.getProjectList);
router.post('/project/addProject', projectController.addProject);
router.get('/project/getProjectById', projectController.getProjectById);
router.get('/project/removeProjectById', projectController.removeProjectById);
router.get('/project/updateProject', projectController.updateProject);
router.get('/project/delUserFromProject', projectController.delUserFromProject);


// bug
router.post('/bug/addBug', bugController.addBug);
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

// rule
router.post('/rule/addRule', ruleController.addRule);
router.get('/rule/removeRule', ruleController.removeRule);
router.get('/rule/getRuleList', ruleController.getRuleList);
app.use(router.routes());
app.use(router.allowedMethods());
module.exports = app;
