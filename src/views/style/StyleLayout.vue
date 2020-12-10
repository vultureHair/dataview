<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <StyleTypeInfo class="center-one"></StyleTypeInfo>
      <StyleTree class="center-two"></StyleTree>
      <StyleBar></StyleBar>
    </div>
  </div>
</template>

<script>
import StyleTypeInfo from "@/components/style/styleLayout/StyleTypeInfo";
import StyleTree from "@/components/style/styleLayout/StyleTree";
import StyleBar from "@/components/style/styleLayout/StyleBar";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "StyleLayout",
  components: {
    StyleTypeInfo,
    StyleTree,
    StyleBar,
    HistoryView
  }
};
</script>

<style scoped>
.con {
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto;
}
.left {
  border-right: 1px solid #000;
}

.center-one {
  border-bottom: 1px solid #000;
}

.center-two {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
