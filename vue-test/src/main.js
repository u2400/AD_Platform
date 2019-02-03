import Vue from "vue";
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import App from "./App";
import VueRouter from 'vue-router'

Vue.use(Antd)
Vue.use(VueRouter)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
