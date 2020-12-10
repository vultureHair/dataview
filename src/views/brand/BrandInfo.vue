<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <BrandInfoEcharts class="BrandInfoEcharts"></BrandInfoEcharts>
      <BrandProductTop class="BrandProductTop"></BrandProductTop>
      <BrandGrid class="BrandGrid"></BrandGrid>
    </div>
    <div class="right">
      <BrandPicture></BrandPicture>
    </div>
  </div>
</template>

<script>
import BrandInfoEcharts from "@/components/brand/brandInfo/center/BrandInfo";
import BrandProductTop from "@/components/brand/brandInfo/center/BrandProductTop";
import BrandGrid from "@/components/brand/brandInfo/center/BrandGrid";
import BrandPicture from "@/components/brand/brandInfo/right/BrandPicture";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "BrandInfo",
  components: {
    BrandInfoEcharts,
    BrandProductTop,
    BrandGrid,
    BrandPicture,
    HistoryView
  }
};
</script>

<style scoped>
.con {
  display: grid;
  grid-template-columns: 300px auto 300px;
  grid-template-rows: auto;
}
.left {
  border-right: 1px solid #000;
}
.right {
  border-left: 1px solid #000;
}

.BrandInfoEcharts {
  border-bottom: 1px solid #000 !important;
  padding-bottom: 10px;
}
.BrandProductTop {
  border-bottom: 1px solid #000 !important;
  padding-bottom: 10px;
}

.BrandGrid {
  position: relative;
}
</style>
