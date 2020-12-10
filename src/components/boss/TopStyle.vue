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
var colors = [
  "#C33531",
  "#64BD3D",
  "#EE9201",
  "#29AAE3",
  "#B74AE5",
  "#0AAF9F",
  "#E89589"
];

export default {
  name: "TopStyle",
  data() {
    return {
      option: {
        title: {
          text: "Top10热门款式",
          left: "center",
          subtext: "（最近三月）"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          textStyle: {
            color: "#000"
          }
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
            dataView: {
              show: true,
              readOnly: false
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
            axisLabel: {
              interval: 0,
              rotate: 15
            },
            data: []
          },
          {
            show: false,
            type: "category",
            data: [
              "Top1",
              "Top2",
              "Top3",
              "Top4",
              "Top5",
              "Top6",
              "Top7",
              "Top8",
              "Top9",
              "Top10"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            boundaryGap: [0, 0.1],
            splitLine: false
          }
        ],
        series: [
          {
            name: "销售数量",
            type: "bar",
            itemStyle: {
              normal: {
                color: function(obj) {
                  if (obj.dataIndex >= 0) {
                    return colors[obj.dataIndex];
                  }
                },
                barBorderWidth: 0,
                barBorderRadius: 1,
                label: {
                  show: false,
                  position: "insideTop"
                }
              }
            },
            data: []
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

    var myChart = echarts.init(this.$refs.echartId);
    myChart.clear();
  },
  methods: {
    initEcharts() {
      var myChart = echarts.init(this.$refs.echartId);
      myChart.setOption(this.option);

      $(window).resize(function() {
        myChart.resize();
      });

      myChart.on("dblclick", function(param) {
        location.href = "/styleInfo?style=" + param.name;
      });
    },
    getData() {
      this.axios
        .get("/v1/Boss/GetBossTopStyletype")
        .then(response => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.option.xAxis[0].data[i] = response.data.data[i].Styletype;
            this.option.series[0].data[i] = response.data.data[i].totalQuantity;
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
