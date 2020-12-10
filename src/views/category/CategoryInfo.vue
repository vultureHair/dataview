<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <CategoryInfoEcharts class="infoEcharts"></CategoryInfoEcharts>
      <CategoryPriceInfo class="CategoryPriceInfo"></CategoryPriceInfo>
      <CategoryGrid class="center-two"></CategoryGrid>
      <!-- <CategorySalesProductGrid></CategorySalesProductGrid> -->
    </div>
    <div class="right">
      <CategoryPicture class="right-one"></CategoryPicture>
    </div>
  </div>
</template>

<script>
import CategoryInfoEcharts from "@/components/category/categoryInfo/center/CategoryInfo";
import CategoryPriceInfo from "@/components/category/categoryInfo/center/CategoryPriceInfo";
import CategoryGrid from "@/components/category/categoryInfo/center/CategoryGrid";
import CategoryPicture from "@/components/category/categoryInfo/right/Picture";
import HistoryView from "@/components/publicCom/HistoryView";
// import CategorySalesProductGrid from "@/components/category/categoryInfo/right/CategorySalesProductGrid";

export default {
  name: "CategoryInfo",
  components: {
    CategoryInfoEcharts,
    CategoryPriceInfo,
    CategoryGrid,
    CategoryPicture,
    HistoryView
    // CategorySalesProductGrid
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

.right-one {
  border-bottom: 1px solid #000;
}

.infoEcharts {
  border-bottom: 1px solid #000;
}

.center-two {
  border-bottom: 1px solid #000;
  position: relative;
}

.CategoryPriceInfo {
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}
</style>
