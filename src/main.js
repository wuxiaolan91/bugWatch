// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Axios from 'axios';
import App from './App';
import router from './router';
// Add a request interceptor
Axios.interceptors.request.use((config) => {
  let projectId = localStorage.getItem('projectId');
  let userId = localStorage.getItem('userId');
  let companyId = localStorage.getItem('companyId');
  config.headers.common.projectId = projectId;
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
  fetch('/api/bug/addAjaxWatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectId: localStorage.getItem('projectId'),
      message: error.message,
      url,
      errorPage: location.href,
      error: error.stack,
      status: error.status,
    }),
  })
    .then((response) => {
      console.log('发出ajax错误监控');

    });
  // Do something with response error
  return Promise.reject(error);
});

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  const path = to.path;
  if (localStorage.getItem('name') || path.indexOf('login') > -1 || path.indexOf('addUser') > -1 || path.indexOf('addCompany') > -1) {
    const projectId = localStorage.getItem('projectId');
    if (projectId) {
      EventBus.$emit('projectChange', projectId);
    }

    next();
  } else {
    next('/login');
  }
});
window.EventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

