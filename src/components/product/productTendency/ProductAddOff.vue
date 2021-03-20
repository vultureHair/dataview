<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:500px;"></div>
</template>

<script>
import $ from "jquery";

export default {
    name: "ProductAddOff",
    data() {
        return {
            AddDate: "",
            OffDate: "",
            option: {
                color: ["#5793f3", "#d14a61"],
                title: {
                    text: this.$t("product.tendency.shipOut"),
                    left: "center",
                    top: "20px"
                },
                tooltip: {
                    trigger: "axis"
                },
                xAxis: {
                    name: this.$t("product.tendency.ShipDate"),
                    data: []
                },
                yAxis: {
                    name: this.$t("product.tendency.number"),
                    splitLine: {
                        show: false
                    }
                },
                toolbox: {
                    orient: "vertical",
                    top: "30",
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
                        type: "slider",
                        show: true,
                        start: 90,
                        end: 100,
                        xAxisIndex: [0]
                    }
                ],
                series: [
                    {
                        name: this.$t("product.tendency.yData"),
                        type: "bar",
                        data: [],
                        barGap: "0"
                    },
                    {
                        name: this.$t("product.tendency.yData1"),
                        type: "bar",
                        data: [],
                        barGap: "0"
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
            //获取上线产品数量
            this.axios
                .get(this.GLOBAL.urlHead + "ProductTotalTendency/GetProductAddOff")
                .then(response => {
                    let tempData = response.data.data;

                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.xAxis.data[i] = tempData[i].week;
                        this.option.series[0].data[i] = tempData[i].totalAdd;
                        this.option.series[1].data[i] = tempData[i].totalOff;
                    }

                    this.option.xAxis.data.reverse();
                    this.option.series[0].data.reverse();
                    this.option.series[1].data.reverse();

                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
