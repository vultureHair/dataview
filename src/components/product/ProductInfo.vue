<template>
  <div>
    <div id="main" style="width: 800px;height:400px;"></div>
    <!-- <div>
      <div>当前显示最近{{ daycount }}天。</div>
      <div>
        <el-input
          type="text"
          v-model="input"
          placeholder="请输入天数"
          class="inDayCount"
          onkeyup="value=value.replace(/[^\d]/g,'').replace(/^0{1,}/g,'')"
        ></el-input>
        <el-button type="primary" @click="setDaycount()">确认</el-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "productInfoEchart",
  data() {
    return {
      option: {
        color: ["#3398DB"],
        title: {
          text: "产品销售走势图",
          left: "center"
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
            magicType: {
              type: ["line", "bar"]
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 0,
            end: 50
          }
        ],
        xAxis: {
          type: "category",
          name: "销售日期",
          data: []
        },
        yAxis: {
          type: "value",
          name: "销售数量"
        },
        series: [
          {
            name: "销量",
            data: [],
            type: "line"
          }
        ]
      },
      dataAll: "",
      dataX: [],
      dataY: [],
      barCode: "",
      daycount: 180
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    initEcharts() {
      var echarts = require("echarts");
      var myChart = echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
    getData() {
      this.barCode = this.$route.query.barCode;
      this.daycount = this.$route.query.daycount;

      this.axios
        .get(
          "/v1/ProductDetail/getproductsalesdata?barCode=" +
            this.barCode +
            "&daycount=" +
            this.daycount
        )
        .then(response => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.dataX[i] = response.data.data[i].Order_Date;
            this.dataY[i] = response.data.data[i].Quantity;
          }
          this.dataAll = response.data.data;
          this.option.xAxis.data = this.dataX;
          this.option.series[0].data = this.dataY;
          this.initEcharts();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setDaycount() {
      console.log("text");
      let text = $(".inDayCount")[0].value;
      console.log(text);
    }
  }
};
</script>

<style scoped>
.inDayCount {
  width: 150px;
}
</style>
