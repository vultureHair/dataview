<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "SalesDay",
    data() {
        return {
            option: {
                title: {
                    text: this.$t("boss.dayChart"),
                    left: "center",
                    top: "10px",
                    subtext: this.$t("boss.dayChart2")
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    }
                },
                toolbox: {
                    orient: "vertical",
                    top: "30",
                    right: "5",
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        // dataView: {
                        //     show: true
                        //     optionToContent: function(opt) {
                        //       console.log(opt);
                        //       let axisData = opt.xAxis[0].data;
                        //       let number = opt.series[0].data;
                        //       let price = opt.series[1].data;
                        //       console.log(axisData);
                        //       console.log(number);
                        //       console.log(price);
                        //     }
                        // },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        start: 70,
                        end: 100
                    }
                ],
                xAxis: {
                    type: "category",
                    name: this.$t("boss.xCoordinate1"),
                    data: []
                },
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("boss.yCoordinate1"),
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        type: "value",
                        name: this.$t("boss.yCoordinate2"),
                        splitLine: {
                            show: false
                        }
                    }
                ],
                legend: {
                    data: [this.$t("boss.yCoordinate1"), this.$t("boss.yCoordinate2")],
                    left: "20",
                    top: "10"
                },
                series: [
                    {
                        name: this.$t("boss.yCoordinate1"),
                        data: [],
                        type: "bar",
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
                        name: this.$t("boss.yCoordinate2"),
                        data: [],
                        type: "line",
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
                        yAxisIndex: 1
                    }
                ]
            }
        };
    },
    created() {
        this.getData();
    },
    mounted() {},
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
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "Boss/GetBossProductCount?type=1")
                .then(response => {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.xAxis.data[i] = response.data.data[i].seriesX;
                        this.option.series[0].data[i] = response.data.data[i].totalQuantity;
                        this.option.series[1].data[i] = response.data.data[i].totalPrice;
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
