<template>
  <div
    id="productEchart"
    ref="echartCateId"
    style="width: 100%;height:500px;"
  ></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "ModelTypeInfo",
  data() {
    return {
      option: {
        title: [
          {
            text: "款式布局一览图",
            left: "center",
            top: "10px"
          }
        ],
        toolbox: {
          orient: "vertical",
          top: "30",
          right: "5",
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: {},
            magicType: {
              type: ["bar", "line"]
            },
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "axis"
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 10
          }
        ],
        xAxis: {
          type: "category",
          name: "款式名称",
          data: []
        },
        yAxis: [
          {
            type: "value",
            name: "在网产品数量"
          }
        ],
        series: [
          {
            name: "在网产品数量",
            data: [],
            type: "bar",
            yAxisIndex: 0,
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
            name: "所占比例(%)",
            data: [],
            type: "line",
            symbolSize: 0,
            lineStyle: {
              width: 0,
              color: "#000"
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

    var myChart = echarts.init(this.$refs.echartCateId);
    myChart.clear();
  },
  methods: {
    initEcharts() {
      var myChart = echarts.init(this.$refs.echartCateId);
      myChart.clear();
      myChart.setOption(this.option);

      $(window).resize(function() {
        myChart.resize();
      });
    },
    getData() {
      this.axios
        .get("/v1/ModelLayout/GetModelProductAccount")
        .then(response => {
          let tempData = response.data.data;

          for (let i = 0; i < response.data.data.length; i++) {
            this.option.xAxis.data[i] = tempData[i].model;
            this.option.series[0].data[i] = tempData[i].total;
            this.option.series[1].data[i] = tempData[i].percent;
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
