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
  name: "CustomerProductTop",
  data() {
    return {
      option: {
        title: {
          text: "top30产品累积购买图",
          left: "center",
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
            name: "购买数量"
          },
          {
            type: "value",
            name: "购买数量",
            show: false
          }
        ],
        series: [
          {
            name: "购买数量",
            type: "bar",
            barMinHeight: "3",
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
            name: "累积购买金额",
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
      customer: ""
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
      this.customer = this.$route.query.customer;

      if (!this.customer) {
        let sessioncustomer = sessionStorage.getItem("customer");

        if (sessioncustomer != null || sessioncustomer != undefined) {
          this.customer = sessioncustomer;
        }
      }
      this.axios
        .get(
          "/v1/CustomerInfo/GetCustomerProductTopsales?customer=" +
            this.customer
        )
        .then(response => {
          let tempData = response.data.data;
          console.log(tempData);
          for (let i = 1; i <= response.data.data.length; i++) {
            this.option.xAxis[0].data[i - 1] = tempData[i - 1].sil_No_;
            this.option.xAxis[1].data[i - 1] = "Top" + i;
            this.option.series[0].data[i - 1] = tempData[i - 1].totalValue;
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
