<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <CategoryTypeInfo class="center-one"></CategoryTypeInfo>
      <CategoryTree class="center-two"></CategoryTree>
      <CategoryBar></CategoryBar>
    </div>
  </div>
</template>

<script>
import CategoryTypeInfo from "@/components/category/categoryLayout/CategoryTypeInfo";
import CategoryTree from "@/components/category/categoryLayout/CategoryTree";
import CategoryBar from "@/components/category/categoryLayout/CategoryBar";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "CategoryLayout",
  components: {
    CategoryTypeInfo,
    CategoryTree,
    CategoryBar,
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
