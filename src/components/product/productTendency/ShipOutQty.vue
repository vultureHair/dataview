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
                    text: this.$t("product.tendency.replenish"),
                    left: "center",
                    subtext: this.$t("product.tendency.smallTitle"),
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
                        name: this.$t("product.tendency.replenishDate")
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("product.tendency.number")
                    }
                ],
                series: [
                    {
                        name: this.$t("product.tendency.number"),
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
                .get(this.GLOBAL.urlHead + "ProductTotalTendency/GetProductShipOut")
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
