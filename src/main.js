import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import toast from "./components/common/toast";
import store from './store';
import './rem'
import 'amfe-flexible';
/*import './myLibFlexible4h';*/

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
