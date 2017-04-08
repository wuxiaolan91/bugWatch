import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';
import Dashboard from '@/components/dashboard/dashboard.vue';
import List from '@/components/bugList/bugList.vue';
import Ajax from '@/components/Ajax/ajaxList.vue';
import Email from '@/components/email/email.vue';
import Performance from '@/components/Performance/Performance.vue';
Vue.use(Router);

export default new Router({
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
      path: '/dashboard', // bug的日志列表
      component: Dashboard
    },
    {
      path: '/ajax', // ajax的日志列表(包括有问题的ajax或者特别慢的ajax记录)
      name: 'ajax',
      component: Ajax
    },
    {
      path: '/email', // bug的日志列表
      component: App,
      children: [{
        path: '',
        component: Email
      }]
    },
    {
      path: '/performance', // 性能极客
      component: App,
      children: [{
        path: '',
        component: Performance
      }]
    }
  ],
});
