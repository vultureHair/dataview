<template>
  <div class="pieCon">
    <div class="switchDayCount">
      <span>切换时间：</span>
      <select id="dayCount" class="" @change="changeDay()">
        <option value="30">最近一月</option>
        <option value="90">最近三月</option>
        <option value="180">最近半年</option>
        <option value="365">最近一年</option>
      </select>
    </div>
    <div class="customData">
      <input
        id="customNumber"
        type="text"
        maxlength="4"
        placeholder="请输入四位数以内天数"
        class="customNumber"
        oninput="this.value=this.value.replace(/[^0-9]/g,'');"
      />
      <button class="customBtn" @click="customNumber()">确认</button>
    </div>
    <div id="TreeEchart" ref="echartId" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "PieCustomerGrade",
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
          text: "客户级别订购饼状图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            startAngle: 90,
            name: "销售数量",
            type: "pie",
            radius: ["30%", "60%"],
            center: ["50%", "50%"],
            minAngle: 5,
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      dayCount: 90
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
        .get("/v1/Boss/getBossCustomerSalesPie?dayCount=" + this.dayCount)
        .then(response => {
          this.option.series[0].data = response.data.data;

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
    customNumber() {
      var mySelect = document.getElementById("customNumber").value;
      if (mySelect) {
        this.dayCount = mySelect;
        console.log(this.dayCount);
        this.getData();
      }
    }
  }
};
</script>

<style scoped>
.pieCon {
  text-align: left;
}

.switchDayCount {
  height: 30px;
  padding-left: 10px;
  display: inline-block;
}

.salesTotal {
  margin-left: 20px;
}

.customData {
  display: inline-block;
  padding-left: 20px;
  vertical-align: top;
}

.customNumber {
  vertical-align: top;
}

.customBtn {
  vertical-align: top;
  height: 21px;
}
</style>
