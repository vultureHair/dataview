<template>
  <div
    id="productEchart"
    ref="echartId"
    style="width: 100%;height:300px;"
  ></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "SalesYear",
  data() {
    return {
      option: {
        title: {
          text: "年销售走势图",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          orient: "vertical",
          top: "30",
          right: "5",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: {},
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 0,
            end: 100
          }
        ],
        xAxis: {
          type: "category",
          name: "销售日期",
          data: []
        },
        yAxis: [
          {
            type: "value",
            name: "销售数量",
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            name: "销售金额",
            splitLine: {
              show: false
            }
          }
        ],
        legend: {
          data: ["销售数量", "销售金额"],
          left: "0",
          top: "0"
        },
        grid: {
          right: "15%"
        },
        series: [
          {
            name: "销售数量",
            data: [],
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            }
          },
          {
            name: "销售金额",
            data: [],
            type: "line",
            yAxisIndex: 1,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener("resize", function() {});

    var echarts = require("echarts");
    var myChart = echarts.init(this.$refs.echartId);
    myChart.clear();
  },
  methods: {
    initEcharts() {
      var echarts = require("echarts");
      var myChart = echarts.init(this.$refs.echartId);
      myChart.setOption(this.option);

      $(window).resize(function() {
        myChart.resize();
      });
    },
    getData() {
      this.axios
        .get("/v1/Boss/GetBossProductCount?type=5")
        .then(response => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.option.xAxis.data[i] = response.data.data[i].seriesX;
            this.option.series[0].data[i] = response.data.data[i].totalQuantity;
            this.option.series[1].data[i] = response.data.data[i].totalPrice;
          }

          this.initEcharts();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.inDayCount {
  width: 150px;
}
</style>
