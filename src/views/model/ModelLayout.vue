<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <ModelTypeInfo class="center-one"></ModelTypeInfo>
      <ModelTree class="center-two"></ModelTree>
      <ModelBar></ModelBar>
    </div>
  </div>
</template>

<script>
import ModelTypeInfo from "@/components/model/modelLayout/ModelTypeInfo";
import ModelTree from "@/components/model/modelLayout/ModelTree";
import ModelBar from "@/components/model/modelLayout/ModelBar";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "ModelLayout",
  components: {
    ModelTypeInfo,
    ModelTree,
    ModelBar,
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
