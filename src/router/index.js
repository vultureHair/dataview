import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/productList",
    name: "ProductList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/product/ProductList.vue")
  },
  {
    path: "/productInfo",
    name: "ProductInfo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/product/ProductInfo.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
