<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "ModelProductTop",
    props: {
        day: {
            type: String,
            default: "180"
        }
    },
    data() {
        return {
            option: {
                title: {
                    text: this.$t("category.info.topProduct"),
                    subtext: this.$t("category.info.smallTitle"),
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
                        name: this.$t("product.tendency.salesQuantity")
                    },
                    {
                        type: "value",
                        name: this.$t("product.tendency.salesQuantity"),
                        show: false
                    }
                ],
                series: [
                    {
                        name: this.$t("product.tendency.salesQuantity"),
                        type: "bar",
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#83bff6" },
                                { offset: 0.5, color: "#188df0" },
                                { offset: 1, color: "#188df0" }
                            ])
                        },
                        barMinHeight: 3,
                        data: []
                    },
                    {
                        name: this.$t("product.tendency.salesAmount"),
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
            model: ""
        };
    },
    watch: {
        day() {
            this.getData();
        }
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
            myChart.setOption(this.option);
            $(window).resize(function() {
                myChart.resize();
            });
        },
        getData() {
            this.model = this.$route.query.model;

            if (!this.style) {
                let sessionmodel = sessionStorage.getItem("model");

                if (sessionmodel != null || sessionmodel != undefined) {
                    this.model = sessionmodel;
                }
            }
            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ModelDetail/GetModelProductToptalsales?model=" +
                        this.model +
                        "&day=" +
                        this.day
                )
                .then(response => {
                    let tempData = response.data.data;
                    this.option.xAxis[0].data = [];
                    this.option.xAxis[1].data = [];
                    this.option.series[0].data = [];
                    this.option.series[1].data = [];

                    for (let i = 1; i <= response.data.data.length; i++) {
                        this.option.xAxis[0].data[i - 1] = tempData[i - 1].ProductId;
                        this.option.xAxis[1].data[i - 1] = "Top" + i;
                        this.option.series[0].data[i - 1] = tempData[i - 1].totalQuantity;
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
