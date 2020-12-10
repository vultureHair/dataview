<template>
  <div
    id="productEchart"
    ref="echartId"
    style="width: 100%;height:500px;"
  ></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "TotalEveryProduct",
  data() {
    return {
      option: {
        color: ["#3398DB"],
        title: {
          text: "产品销售比例图（‱）",
          left: "center",
          top: "20px"
        },
        toolbox: {
          orient: "vertical",
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: [
          {
            type: "category",
            data: []
          },
          {
            show: false,
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            boundaryGap: [0, 0.1],
            splitLine: false
          },
          {
            type: "value",
            name: "比例",
            axisLabel: {
              formatter: "{value} ‱"
            },
            splitLine: false
          }
        ],
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0, 1],
            start: 0,
            end: 0.1
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        series: [
          {
            name: "销售数量",
            type: "bar",
            barCategoryGap: "0%",
            large: true,
            largeThreshold: 500,
            progressive: 3000,
            barMinWidth: 5,
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
            },
            data: []
          },
          {
            name: "所占比例",
            type: "line",
            data: [],
            symbolSize: 0,
            lineStyle: {
              width: 0,
              color: "#000"
            }
          },
          {
            name: "累积比例",
            type: "line",
            data: [],
            yAxisIndex: 1,
            lineStyle: {
              width: 1,
              color: "#3398DB"
            }
          }
        ]
      }
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
      this.axios
        .get("/v1/ProductTotalTendency/GetProductEveryTotal")
        .then(response => {
          let tempData = response.data.data;
          let totalPercent = 0;
          for (let i = 1; i <= response.data.data.length; i++) {
            this.option.xAxis[0].data[i - 1] = tempData[i - 1].ProductId;
            this.option.xAxis[1].data[i - 1] = "Top" + i;
            this.option.series[0].data[i - 1] = tempData[i - 1].account;
            this.option.series[1].data[i - 1] = tempData[i - 1].total;

            totalPercent = totalPercent + tempData[i - 1].total;
            this.option.series[2].data[i - 1] = totalPercent.toFixed(2);
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
