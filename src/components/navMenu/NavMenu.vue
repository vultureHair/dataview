<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/total">Boss驾驶舱</el-menu-item>
    <el-submenu index="2">
      <template slot="title">产品分析</template>
      <el-menu-item index="/productList">产品列表</el-menu-item>
      <el-menu-item index="/productInfo">产品详情</el-menu-item>
      <el-menu-item index="/productTendency">产品总销售趋势</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">类别分析</template>
      <el-menu-item index="/categoryList">类别一览</el-menu-item>
      <el-menu-item index="/categoryInfo">类别详情</el-menu-item>
      <el-menu-item index="/categoryLayout">类别布局</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">品牌分析</template>
      <el-menu-item index="/brandList">品牌一览</el-menu-item>
      <el-menu-item index="/brandInfo">品牌详情</el-menu-item>
      <el-menu-item index="/brandLayout">品牌布局</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">款式分析</template>
      <el-menu-item index="/styleList">款式一览</el-menu-item>
      <el-menu-item index="/styleInfo">款式详情</el-menu-item>
      <el-menu-item index="/styleLayout">款式布局</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">型号分析</template>
      <el-menu-item index="/modelList">型号一览</el-menu-item>
      <el-menu-item index="/modelInfo">型号详情</el-menu-item>
      <el-menu-item index="/modelLayout">型号布局</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">客户分析</template>
      <el-menu-item index="/customerList">客户一览</el-menu-item>
      <el-menu-item index="/customerInfo">客户详情</el-menu-item>
      <el-menu-item index="/customerLayout">客户布局</el-menu-item>
    </el-submenu>
    <el-menu-item>网站日志</el-menu-item>
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
