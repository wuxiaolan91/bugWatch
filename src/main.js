// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';
import Axios from 'axios';
import App from './App';
import router from './router';
import store from './vuex';
// Add a request interceptor
Axios.interceptors.request.use((config) => {
  const projectId = store.state.projectId;
  const userId = localStorage.getItem('userId');
  const companyId = localStorage.getItem('companyId');
  if (projectId) config.headers.common.projectId = projectId;
  if (userId) config.headers.common.userId = userId;
  if (companyId) config.headers.common.companyId = companyId;
  // Do something before request is sent
  return config;
}, error =>
    // Do something with request error
    Promise.reject(error));
// Add a response interceptor
Axios.interceptors.response.use(response =>
  // Do something with response data
  response, (error) => {
    let url = '';
    if (error.config) url = error.config.url;
    bugWatch.reportAjax(error)
    // Do something with response error
    return Promise.reject(error);
});

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const path = to.path;
  const userId = localStorage.getItem('userId');
  if (to.path == '/login' || path.indexOf('addUser') > -1) {
    next();
  } else {
    if (!userId) {
      next('/login');
    } else {
      let companyId = localStorage.getItem('companyId');
      if (to.path != '/addCompany' && !companyId) {
        // this.$message('您还没有公司，请先添加公司');
        next('/addCompany');
      } else {
        let projectId = localStorage.getItem('projectId');
        if (!projectId) {
          EventBus.$emit('projectChange', projectId);
        }
        next();
      }
    }
  }
});
window.EventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

