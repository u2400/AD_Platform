import Vue from "vue";
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import App from "./App";
import router from "./router.js"

Vue.use(Antd)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
