<template>
    <div>
        <div class="switchDayCount">
            <span>{{ $t("product.tendency.switchTime") }}</span>
            <select id="dayCountTotal" class="" @change="changeDay()">
                <option value="90">{{ $t("product.tendency.switchInfo3") }}</option>
                <option value="180">{{ $t("product.tendency.switchInfo4") }}</option>
                <option value="365">{{ $t("product.tendency.switchInfo5") }}</option>
                <option value="1095">{{ $t("product.tendency.switchInfo6") }}</option>
            </select>
        </div>
        <div id="productEchart" ref="echartId" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "TotalEveryProduct",
    data() {
        return {
            option: {
                color: ["#3398DB"],
                title: {
                    text: this.$t("product.tendency.proTotalEvery"),
                    left: "center",
                    top: "20px"
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
                        name: this.$t("product.tendency.salesQuantity"),
                        boundaryGap: [0, 0.1],
                        splitLine: false
                    },
                    {
                        type: "value",
                        name: this.$t("product.tendency.ratio"),
                        axisLabel: {
                            formatter: "{value} ‱"
                        },
                        splitLine: false
                    }
                ],
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        xAxisIndex: [0, 1],
                        start: 0,
                        end: 1
                    }
                ],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#283b56"
                        }
                    }
                },
                series: [
                    {
                        name: this.$t("product.tendency.salesQuantity"),
                        type: "bar",
                        barCategoryGap: "0%",
                        large: true,
                        largeThreshold: 500,
                        progressive: 3000,
                        barMinWidth: 5,
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
                        },
                        data: []
                    },
                    {
                        name: this.$t("product.tendency.ratio"),
                        type: "line",
                        data: [],
                        symbolSize: 0,
                        lineStyle: {
                            width: 0,
                            color: "#000"
                        }
                    },
                    {
                        name: this.$t("product.tendency.totalRatio"),
                        type: "line",
                        data: [],
                        yAxisIndex: 1,
                        lineStyle: {
                            width: 1,
                            color: "#3398DB"
                        }
                    }
                ]
            },
            days: 90
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
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetProductEveryTotal?days=" +
                        this.days
                )
                .then(response => {
                    let tempData = response.data.data;
                    let totalPercent = 0;
                    for (let i = 1; i <= response.data.data.length; i++) {
                        this.option.xAxis[0].data[i - 1] = tempData[i - 1].ProductId;
                        this.option.xAxis[1].data[i - 1] = "Top" + i;
                        this.option.series[0].data[i - 1] = tempData[i - 1].account;
                        this.option.series[1].data[i - 1] = tempData[i - 1].total;

                        totalPercent = totalPercent + tempData[i - 1].total;
                        this.option.series[2].data[i - 1] = totalPercent.toFixed(2);
                    }

                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeDay() {
            var mySelect = document.getElementById("dayCountTotal");
            this.days = mySelect.options[mySelect.selectedIndex].value;

            this.getData();
        }
    }
};
</script>

<style scoped>
.switchDayCount {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0 0 10px;
}
</style>
