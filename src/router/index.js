import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Dashboard from '@/components/dashboard/dashboard.vue';
import List from '@/components/list/list.vue';
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
    }
  ],
});
