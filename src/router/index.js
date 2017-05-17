import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';
const Dashboard = resolve => require(['@/components/dashboard/dashboard.vue'], resolve);
const Company = resolve => require(['@/components/company/company.vue'], resolve);
const AddCompany = resolve => require(['@/components/company/addCompany.vue'], resolve);
const List = resolve => require(['@/components/bugList/bugList.vue'], resolve);
const Ajax = resolve => require(['@/components/ajax/ajaxList.vue'], resolve);
const Rule = resolve => require(['@/components/rule/rule.vue'], resolve);
const Login = resolve => require(['@/components/user/login.vue'], resolve);

const AddUser = resolve => require(['@/components/user/addUser.vue'], resolve);
const ProjectList = resolve => require(['@/components/project/projectList.vue'], resolve);
const project = resolve => require(['@/components/project/project.vue'], resolve);
const Guide = resolve => require(['@/components/guide/guide.vue'], resolve);
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/bugList', // bug的日志列表
      name: 'list',
      component: List,
    },
    {
      path: '/company', // 公司界面
      name: 'company',
      component: Company,
    },
    {
      path: '/addCompany', // 公司界面
      name: 'addCompany',
      component: AddCompany,
    },
    {
      path: '/guide', // 新人指南
      name: 'guide',
      component: Guide,
    },
    {
      path: '/projectList', // 项目列表
      name: 'projectList',
      component: ProjectList,
    },
    {
      path: '/project', // 项目列表
      name: 'project',
      component: project,
    },
    {
      path: '/dashboard', // bug的日志列表
      component: Dashboard,
    },
    {
      path: '/addUser', // 添加用户
      component: AddUser,
    },
    {
      path: '/login', // 登录
      component: Login,
    },
    {
      path: '/ajax', // ajax的日志列表(包括有问题的ajax或者特别慢的ajax记录)
      name: 'ajax',
      component: Ajax,
    },
    {
      path: '/rule', // bug报警的规则页面
      component: Rule,
    },
    {
      path: '/performance', // 性能极客
      component: App,
    },

  ],
});
export default router;
