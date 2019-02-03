import Vue from "vue";
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/dist/antd.css";
import App from "./App";
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.component(Button.name, Button);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
