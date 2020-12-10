<template>
  <div ref="echartId" style="width: 100%;height:500px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "ShipOutQty",
  data() {
    return {
      option: {
        title: {
          text: "产品总量补货数据图",
          left: "center",
          subtext: "（最近一年）",
          top: "10px"
        },
        tooltip: {
          trigger: "axis"
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
            show: true,
            start: 60,
            end: 100
          }
        ],
        xAxis: [
          {
            type: "category",
            data: [],
            name: "补货日期"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单日补货"
          }
        ],
        series: [
          {
            name: "单日补货",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
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
        .get("/v1/ProductTotalTendency/GetProductShipOut")
        .then(response => {
          let tempData = response.data.data;
          for (let i = 1; i <= response.data.data.length; i++) {
            this.option.xAxis[0].data[i - 1] = tempData[i - 1].date;
            this.option.series[0].data[i - 1] = tempData[i - 1].total;
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
