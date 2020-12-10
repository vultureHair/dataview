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
  name: "StyleProductTop",
  data() {
    return {
      option: {
        title: {
          text: "top30产品图",
          left: "center",
          subtext: "(最近半年)",
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
            start: 0,
            end: 70,
            xAxisIndex: [0, 1]
          }
        ],
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
            name: "销量"
          },
          {
            type: "value",
            name: "销量",
            show: false
          }
        ],
        series: [
          {
            name: "累积销量",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            data: []
          },
          {
            name: "累积销售额",
            type: "line",
            lineStyle: {
              width: 0
            },
            symbol: "none",
            data: [],
            yAxisIndex: 1
          }
        ]
      },
      style: ""
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
    },
    getData() {
      this.style = this.$route.query.style;

      if (!this.style) {
        let sessionstyle = sessionStorage.getItem("style");

        if (sessionstyle != null || sessionstyle != undefined) {
          this.style = sessionstyle;
        }
      }
      this.axios
        .get("/v1/StyleInfo/GetStyleProductToptalsales?style=" + this.style)
        .then(response => {
          let tempData = response.data.data;
          for (let i = 1; i <= response.data.data.length; i++) {
            this.option.xAxis[0].data[i - 1] = tempData[i - 1].ProductId;
            this.option.xAxis[1].data[i - 1] = "Top" + i;
            this.option.series[0].data[i - 1] = tempData[i - 1].totalQuantity;
            this.option.series[1].data[i - 1] = tempData[i - 1].totalPrice;
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
