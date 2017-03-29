import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/dashboard/dashboard.vue';
import List from '@/components/list/list.vue';
import email from '@/components/email/email.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Dashboard,
    },
    {
      path: '/list', // bug的日志列表
      name: 'list',
      component: List,
    },
    {
      path: '/email', // bug的日志列表
      name: 'email',
      component: email,
    }
  ],
});
