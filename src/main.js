import Vue from 'vue'
import Api from './services/ApiPlugin';
import App from './App.vue'
import axios from 'axios';
import { BootstrapVue } from 'bootstrap-vue'
import router from './router';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import TokenService from "@/services/TokenService";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

axios.interceptors.response.use(res => res, error => {
  if (error.response && error.response.status === 401) {
    TokenService.removeToken();
    router.push({name: 'sing-in'});
  }
  return Promise.reject(error)
});

Vue.prototype.$_http = "http://localhost:5000";

Vue.use(Api);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueMoment);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
