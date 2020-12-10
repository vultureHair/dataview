<template>
  <div>
    <div class="container-btn">
      <div class="switchDayCount">
        <span>切换时间：</span>
        <select id="dayCount" class="" @change="changeDay()">
          <option value="180">最近半年（默认）</option>
          <option value="30">最近一月</option>
          <option value="90">最近三月</option>
          <option value="365">最近一年</option>
        </select>
      </div>
      <div class="switchDayCount">
        <span>切换周期：</span>
        <select id="dayPeriod" class="" @change="changePeriod()">
          <option value="day">天（默认）</option>
          <option value="week">周</option>
          <option value="month">月</option>
          <option value="season">季</option>
          <option value="year">年</option>
        </select>
      </div>
    </div>
    <div
      id="productEchart"
      ref="echartId"
      style="width: 100%;height:500px;"
    ></div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "BrandInfoEchart",
  data() {
    return {
      option: {
        color: ["#3398DB", "#3398DB"],
        title: {
          text: "",
          left: "center",
          top: "10px"
        },
        tooltip: {
          trigger: "axis"
        },
        axisPointer: {
          link: { xAxisIndex: "all" }
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
            show: true,
            start: 0,
            end: 100,
            xAxisIndex: [0, 1]
          }
        ],
        xAxis: [
          {
            type: "category",
            name: "销售日期",
            data: [],
            large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
            largeThreshold: 500
          },
          {
            type: "category",
            name: "销售日期",
            data: [],
            large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
            largeThreshold: 500,
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "销量"
          },
          {
            type: "value",
            name: "销售额",
            gridIndex: 1
          }
        ],
        grid: [
          {
            bottom: "60%"
          },
          {
            top: "60%"
          }
        ],
        series: [
          {
            name: "销量",
            data: [],
            type: "line"
          },
          {
            name: "销售额",
            data: [],
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1
          }
        ]
      },
      BrandId: "",
      brand: "",
      dayCount: 180,
      period: "day"
    };
  },
  created() {
    this.getData();
  },
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
      myChart.clear();
      myChart.setOption(this.option);

      $(window).resize(function() {
        myChart.resize();
      });
    },
    getData() {
      this.BrandId = this.$route.query.BrandId;

      if (!this.BrandId) {
        let sessionBrandId = sessionStorage.getItem("BrandId");

        if (sessionBrandId != null || sessionBrandId != undefined) {
          this.BrandId = sessionBrandId;
        }
      }
      this.axios
        .get(
          "/v1/BrandDetail/GetBrandSalesDetail?BrandId=" +
            this.BrandId +
            "&dayCount=" +
            this.dayCount +
            "&period=" +
            this.period
        )
        .then(response => {
          this.option.xAxis[0].data.length = 0;
          this.option.xAxis[1].data.length = 0;
          this.option.series[0].data.length = 0;
          this.option.series[1].data.length = 0;

          for (let i = 0; i < response.data.data.length; i++) {
            this.option.xAxis[0].data[i] = response.data.data[i].date;
            this.option.xAxis[1].data[i] = response.data.data[i].date;
            this.option.series[0].data[i] = response.data.data[i].total;
            this.option.series[1].data[i] = response.data.data[i].price;
          }

          if (response.data.data.length > 0) {
            this.option.title.text =
              response.data.data[0].brand + "品牌销量——销售走势图";
          }

          this.brand = response.data.data[0].brand;
          sessionStorage.removeItem("BrandId");
          sessionStorage.setItem("BrandId", this.BrandId);
          this.SetLocalStorage(3, this.brand, this.BrandId);
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
    },
    changePeriod() {
      var mySelect = document.getElementById("dayPeriod");
      this.period = mySelect.options[mySelect.selectedIndex].value;

      this.getData();
    }
  }
};
</script>

<style scoped>
.inDayCount {
  width: 150px;
}
.container-btn {
  text-align: left;
  padding-top: 5px;
}

.switchDayCount {
  height: 30px;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
  padding-left: 10px;
  display: inline;
  padding-right: 10px;
}
</style>
