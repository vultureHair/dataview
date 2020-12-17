<template>
  <div>
    <div class="switchDayCount">
      <span>切换时间：</span>
      <select id="dayCount" class="" @change="changeDay()">
        <option value="30">最近一月</option>
        <option value="90">最近三月</option>
        <option value="180">最近半年</option>
        <option value="365">最近一年</option>
      </select>
    </div>
    <div class="treeBtn">
      <button @click="changeType(1)">类别</button>
      <button @click="changeType(2)">品牌</button>
      <button @click="changeType(3)">款式</button>
      <button @click="changeType(4)">型号</button>
    </div>
    <div class="selectLevel">
      <span>选择下一层级：</span>
      <select id="nextLevel" class="" @change="changeNextLevel()">
        <option v-for="(item, key) in list" :key="key" :value="item.value">{{
          item.name
        }}</option>
      </select>
      <span>当前层级:{{ track }}</span>
    </div>
    <div id="TreeEchart" ref="echartId" style="width: 100%;height:300px;"></div>
  </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
  name: "BrandTree",
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
          text: "销售详情矩形树图",
          left: "center"
        },
        toolbox: {
          orient: "vertical",
          right: "5px",
          top: "10px",
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(info) {
            return (
              info.data.name +
              "<br/>" +
              "销量: " +
              info.data.value +
              "<br/>" +
              "销售比例: " +
              info.data.percent
            );
          }
        },
        series: [
          {
            name: "销量",
            type: "treemap",
            roam: "false",
            label: {
              formatter: function(a) {
                return (
                  a.name +
                  "\n\n" +
                  "销量：" +
                  a.value +
                  "\n\n所占比例：" +
                  a.data.percent
                );
              }
            },
            data: ""
          }
        ]
      },
      dayCount: 30,
      type: 1,
      nextLevel: 1,
      track: "类别",
      list: [
        { name: "类别", value: 1 },
        { name: "品牌", value: 2 },
        { name: "款式", value: 3 },
        { name: "型号", value: 4 }
      ]
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

      myChart.on("dblclick", param => {
        this.againGetData(param.value, param.data);
      });
    },
    getData() {
      this.axios
        .get(
          "/v1/ProductTotalTendency/GetSaleTotalByVdoingAndDays?vdoing=" +
            this.type +
            "&days=" +
            this.dayCount
        )
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
    changeType(params) {
      this.type = params;

      if (params == 1) {
        this.track = "类别";
      } else if (params == 2) {
        this.track = "品牌";
      } else if (params == 3) {
        this.track = "款式";
      } else {
        this.track = "型号";
      }
      this.getData();
    },
    againGetData(params, data) {
      let vdoing = this.nextLevel;
      let value = params;
      let CategoryId = 0;
      let pmid = "-404";
      let Brand = 0;
      let style = "default";

      if (data.CategoryNameId) {
        CategoryId = data.CategoryNameId;
      }
      if (data.pmid) {
        pmid = data.pmid;
      }
      if (data.Brand) {
        Brand = data.BrandId;
      }
      if (data.style) {
        style = data.style;
      }

      this.axios
        .get(
          "/v1/ProductTotalTendency/GetSaleTotalByFilter?vdoing=" +
            vdoing +
            "&days=" +
            this.dayCount +
            "&value=" +
            value +
            "&CategoryId=" +
            CategoryId +
            "&Brand=" +
            Brand +
            "&pmid=" +
            pmid +
            "&style=" +
            style
        )
        .then(response => {
          this.option.series[0].data = response.data.data;
          this.initEcharts();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeNextLevel() {
      var mySelect = document.getElementById("nextLevel");
      this.nextLevel = mySelect.options[mySelect.selectedIndex].value;

      if (this.nextLevel == 1) {
        this.track = this.track + "-> 类别";
      } else if (this.nextLevel == 2) {
        this.track = this.track + "-> 品牌";
      } else if (this.nextLevel == 3) {
        this.track = this.track + "-> 款式";
      } else {
        this.track = this.track + "-> 型号";
      }
    }
  }
};
</script>

<style scoped>
.switchDayCount {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
}

.salesTotal {
  margin-left: 20px;
}

.treeBtn {
  float: left;
  position: absolute;
  right: 20px;
  top: 15px;
}

.selectLevel {
  position: absolute;
  top: 15px;
  left: 200px;
}
</style>
