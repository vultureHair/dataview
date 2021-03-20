<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <StyleInfoEcharts
        class="StyleInfoEcharts"
        @day="getDay"
      ></StyleInfoEcharts>
      <StyleProductTop :day="day" class="StyleProductTop"></StyleProductTop>
      <StyleGrid class="StyleGrid"></StyleGrid>
    </div>
    <div class="right">
      <StylePicture :day="day"></StylePicture>
    </div>
  </div>
</template>

<script>
import StyleInfoEcharts from "@/components/style/styleInfo/center/StyleInfo";
import StyleProductTop from "@/components/style/styleInfo/center/StyleProductTop";
import StyleGrid from "@/components/style/styleInfo/center/StyleGrid";
import StylePicture from "@/components/style/styleInfo/right/StylePicture";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "StyleInfo",
  components: {
    StyleInfoEcharts,
    StyleProductTop,
    StyleGrid,
    StylePicture,
    HistoryView
  },
  data() {
    return {
      day: "90"
    };
  },
  methods: {
    getDay(data) {
      this.day = data;
    }
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

.StyleInfoEcharts {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.StyleProductTop {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.StyleGrid {
  position: relative;
}
</style>
