<template>
    <div>
        <div class="container-btn">
            <div class="switchDayCount">
                <span>{{ $t("product.info.switchTime") }}</span>
                <select id="dayCount" class="" @change="changeOption()">
                    <option value="1">{{ $t("product.info.switchInfo") }}</option>
                    <option value="4">{{ $t("product.info.switchInfo1") }}</option>
                    <option value="8">{{ $t("product.info.switchInfo2") }}</option>
                    <option value="2">{{ $t("product.info.switchInfo3") }}</option>
                    <option value="3">{{ $t("product.info.switchInfo4") }}</option>
                    <option value="5">{{ $t("product.info.switchInfo5") }}</option>
                    <option value="6">{{ $t("product.info.switchInfo6") }}</option>
                    <option value="7">{{ $t("product.info.switchInfo7") }}</option>
                    <option value="10">{{ $t("product.info.switchInfo8") }}</option>
                </select>
            </div>
        </div>
        <div id="productEchart" ref="echartId" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "ProductInfoEchart",
    data() {
        return {
            option: {
                color: ["#3398DB", "#3398DB"],
                title: {
                    text: this.$t("product.info.lineTitle"),
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
                        name: this.$t("product.info.salesDate"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500
                    },
                    {
                        type: "category",
                        name: this.$t("product.info.salesDate"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500,
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("product.info.salesQuantity")
                    },
                    {
                        type: "value",
                        name: this.$t("product.info.salesAmount"),
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
                        name: this.$t("product.info.salesQuantity"),
                        data: [],
                        type: "line"
                    },
                    {
                        name: this.$t("product.info.salesAmount"),
                        data: [],
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }
                ]
            },
            barCode: "",
            dayCount: 90,
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
            this.GetBarcodeAndDay();

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductDetail/getproductsalesdata?barCode=" +
                        this.barCode +
                        "&daycount=" +
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
                        this.option.xAxis[0].data[i] = response.data.data[i].Order_Date;
                        this.option.xAxis[1].data[i] = response.data.data[i].Order_Date;
                        this.option.series[0].data[i] = response.data.data[i].totalQuantity;
                        this.option.series[1].data[i] = response.data.data[i].price;
                    }

                    sessionStorage.removeItem("barCode");
                    sessionStorage.setItem("barCode", this.barCode);
                    this.SetLocalStorage(1, this.barCode, this.barCode);
                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeOption() {
            var mySelect = document.getElementById("dayCount");
            var option = mySelect.options[mySelect.selectedIndex].value;

            if (option == 1) {
                this.dayCount = 90;
                this.period = "day";
            } else if (option == 2) {
                this.dayCount = 90;
                this.period = "week";
            } else if (option == 3) {
                this.dayCount = 180;
                this.period = "week";
            } else if (option == 4) {
                this.dayCount = 180;
                this.period = "day";
            } else if (option == 5) {
                this.dayCount = 365;
                this.period = "week";
            } else if (option == 6) {
                this.dayCount = 365;
                this.period = "month";
            } else if (option == 7) {
                this.dayCount = 365;
                this.period = "season";
            } else if (option == 8) {
                this.dayCount = 365;
                this.period = "day";
            } else if (option == 10) {
                this.dayCount = 1095;
                this.period = "year";
            } else {
                this.dayCount = 90;
                this.period = "day";
            }

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
