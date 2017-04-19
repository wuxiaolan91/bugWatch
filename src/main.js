// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Axios from 'axios';
import App from './App';
import router from './router';

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
   fetch("/login", {
        method: "POST",
        body: {
          errorPage: location.href,
          url: error.config.url,
          message: error.message,
          error: error.stack,
          status: error.status,
          ua: navigator.userAgent
        }
  })
  .then(function(response) {
    console.log('发出ajax错误监控');
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
    // Do something with response error
    return Promise.reject(error);
  });

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;
Vue.use(ElementUI);
debugger;
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('name')) {
    next();
  } 
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
