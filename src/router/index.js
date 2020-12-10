import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/total"
  },
  {
    path: "/productInfo",
    name: "ProductInfo",
    component: () => import("../views/product/ProductInfo.vue")
  },
  {
    path: "/productList",
    name: "ProductList",
    component: () => import("../views/product/ProductList.vue")
  },
  {
    path: "/productTendency",
    name: "ProductTendency",
    component: () => import("../views/product/ProductTendency.vue")
  },
  {
    path: "/categoryInfo",
    name: "CategoryInfo",
    component: () => import("../views/category/CategoryInfo.vue")
  },
  {
    path: "/categoryLayout",
    name: "CategoryLayout",
    component: () => import("../views/category/CategoryLayout.vue")
  },
  {
    path: "/categoryList",
    name: "CategoryList",
    component: () => import("../views/category/CategoryList.vue")
  },
  {
    path: "/brandList",
    name: "BrandList",
    component: () => import("../views/brand/BrandList.vue")
  },
  {
    path: "/brandInfo",
    name: "BrandInfo",
    component: () => import("../views/brand/BrandInfo.vue")
  },
  {
    path: "/brandLayout",
    name: "BrandLayout",
    component: () => import("../views/brand/BrandLayout.vue")
  },
  {
    path: "/styleList",
    name: "StyleList",
    component: () => import("../views/style/StyleList.vue")
  },
  {
    path: "/styleInfo",
    name: "StyleInfo",
    component: () => import("../views/style/StyleInfo.vue")
  },
  {
    path: "/styleLayout",
    name: "StyleLayout",
    component: () => import("../views/style/StyleLayout.vue")
  },
  {
    path: "/modelList",
    name: "ModelList",
    component: () => import("../views/model/ModelList.vue")
  },
  {
    path: "/modelInfo",
    name: "ModelInfo",
    component: () => import("../views/model/ModelInfo.vue")
  },
  {
    path: "/modelLayout",
    name: "ModelLayout",
    component: () => import("../views/model/ModelLayout.vue")
  },
  {
    path: "/customerList",
    name: "CustomerList",
    component: () => import("../views/customer/CustomerList.vue")
  },
  {
    path: "/customerInfo",
    name: "CustomerInfo",
    component: () => import("../views/customer/CustomerInfo.vue")
  },
  {
    path: "/customerLayout",
    name: "CustomerLayout",
    component: () => import("../views/customer/CustomerLayout.vue")
  },
  {
    path: "/total",
    name: "Total",
    component: () => import("../views/boss/Total.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
  // base: process.env.BASE_URL
});

export default router;
