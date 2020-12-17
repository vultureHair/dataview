<template>
  <div>
    <div class="switchDayCount">
      <span>切换时间：</span>
      <select id="dayCount" class="" @change="changeDay()">
        <option value="30">最近一月</option>
        <option value="90">最近三月</option>
        <option value="180">最近半年</option>
        <option value="365">最近一年</option>
      </select>
      <span class="salesTotal">该周期累积销售总数：{{ salesTotal }}</span>
    </div>
    <div id="TreeEchart" ref="echartId" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "StyleTree",
  data() {
    return {
      option: {
        color: [
          "#C33531",
          "#64BD3D",
          "#EE9201",
          "#29AAE3",
          "#B74AE5",
          "#0AAF9F",
          "#E89589",
          "#6F3FE1",
          "#5781FD",
          "#4DB1CB",
          "#3EBD7C",
          "#F7A925",
          "#bda29a",
          "#ca8622",
          "#749f83",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        title: {
          text: "款式销售矩形树图",
          left: "center"
        },
        toolbox: {
          orient: "vertical",
          right: "5px",
          top: "10px",
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(info) {
            return (
              info.data.name +
              "<br/>" +
              "销量: " +
              info.data.value +
              "<br/>" +
              "销售比例: " +
              info.data.percent +
              "%"
            );
          }
        },
        series: [
          {
            name: "销量",
            type: "treemap",
            leafDepth: 1,
            roam: "move",
            label: {
              formatter: function(a) {
                return (
                  a.name +
                  "\n\n" +
                  "销量：" +
                  a.value +
                  "\n\n所占比例：" +
                  a.data.percent +
                  "%"
                );
              }
            },
            data: ""
          }
        ]
      },
      salesTotal: "",
      dayCount: 30
    };
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", function() {});

    var myChart = echarts.init(this.$refs.echartId);
    myChart.clear();
  },
  methods: {
    initEcharts() {
      var myChart = echarts.init(this.$refs.echartId);
      myChart.clear();
      myChart.setOption(this.option);

      $(window).resize(function() {
        myChart.resize();
      });
    },
    getData() {
      this.GetBarcode();

      this.axios
        .get("/v1/StyleLayout/getStyleSalesTree?dayCount=" + this.dayCount)
        .then(response => {
          this.option.series[0].data = response.data.data;

          this.salesTotal = response.data.data[0].quantity;
          this.initEcharts();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeDay() {
      var mySelect = document.getElementById("dayCount");
      this.dayCount = mySelect.options[mySelect.selectedIndex].value;

      this.getData();
    }
  }
};
</script>

<style scoped>
.switchDayCount {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

.salesTotal {
  margin-left: 20px;
}
</style>
