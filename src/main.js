import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Axios from 'axios'
import Dashboard from './components/dashboard/dashboard.vue';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: App
    },{
      path: '/dashboard',
      component: Dashboard
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
Vue.prototype.$http = Axios;
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
