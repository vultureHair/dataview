<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <ModelInfoEcharts class="ModelInfoEcharts"></ModelInfoEcharts>
      <ModelProductTop class="ModelProductTop"></ModelProductTop>
      <ModelGrid class="ModelGrid"></ModelGrid>
    </div>
    <div class="right">
      <ModelPicture></ModelPicture>
    </div>
  </div>
</template>

<script>
import ModelInfoEcharts from "@/components/model/modelInfo/center/ModelInfo";
import ModelProductTop from "@/components/model/modelInfo/center/ModelProductTop";
import ModelGrid from "@/components/model/modelInfo/center/ModelGrid";
import ModelPicture from "@/components/model/modelInfo/right/ModelPicture";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "ModelInfo",
  components: {
    ModelInfoEcharts,
    ModelProductTop,
    ModelGrid,
    ModelPicture,
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

.ModelInfoEcharts {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.ModelProductTop {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.ModelGrid {
  position: relative;
}
</style>
