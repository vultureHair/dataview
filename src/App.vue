<template>
  <div id="app">
    <Title></Title>
    <NavMenu></NavMenu>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import Title from "./components/header/Title";
import NavMenu from "./components/navMenu/NavMenu";

export default {
  name: "App",
  components: {
    Title,
    NavMenu
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1000px;
}
a {
  text-decoration: none;
}
.el-main {
  padding: 0 !important;
  border: 2px solid #000;
}
</style>
