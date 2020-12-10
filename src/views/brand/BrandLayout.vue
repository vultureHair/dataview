<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <BrandTypeInfo class="center-one"></BrandTypeInfo>
      <BrandTree class="BrandTree"></BrandTree>
      <BrandBar></BrandBar>
    </div>
  </div>
</template>

<script>
import BrandTypeInfo from "@/components/brand/brandLayout/BrandTypeInfo";
import BrandTree from "@/components/brand/brandLayout/BrandTree";
import BrandBar from "@/components/brand/brandLayout/BrandBar";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "BrandLayout",
  components: {
    BrandTypeInfo,
    BrandTree,
    BrandBar,
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

.BrandTree {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}
</style>
