<template>
  <div class="con">
    <img src="../../assets/images/buslogo.png" width="200px" height="50px" />
    <h2>摩派科技有限公司数据可视化系统</h2>
    <Time></Time>
  </div>
</template>

<script>
import Time from "../publicCom/Time";
export default {
  name: "Title",
  components: {
    Time
  }
};
</script>

<style scoped>
.con {
  display: grid;
  grid-template-columns: 200px auto 200px;
  align-items: center;
}
</style>
