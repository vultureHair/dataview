<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/about">Boss驾驶舱</el-menu-item>
    <el-submenu>
      <template slot="title">产品分析</template>
      <el-menu-item index="/productList?">产品列表</el-menu-item>
      <el-menu-item index="/productInfo?">产品详情</el-menu-item>
      <el-menu-item>选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="/about">类别总览</el-menu-item>
    <el-menu-item>类别总览</el-menu-item>
    <el-menu-item>类别总览</el-menu-item>
    <el-menu-item>类别总览</el-menu-item>
    <el-menu-item>类别总览</el-menu-item>
    <el-menu-item>类别总览</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu"
};
</script>

<style scoped>
a {
  color: rgb(255, 255, 255);
  border-bottom-color: transparent;
  background-color: rgb(84, 92, 100);
}
</style>
