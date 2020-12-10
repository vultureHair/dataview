import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import GlobalMethod from "./assets/global/Methods.vue";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import global_ from "./assets/global/Params.vue";

// 解决这个问题https://blog.csdn.net/qq_40028729/article/details/100517323
import Router from "vue-router";
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};

// 引入样式
import "vue-easytable/libs/themes-base/index.css";
// 导入 table 和 分页组件
import { VTable, VPagination } from "vue-easytable";
// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(GlobalMethod);

Vue.prototype.GLOBAL = global_;

Vue.filter("globalMoney", value => {
  return "$" + Number(value).toFixed(2);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
