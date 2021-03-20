<template>
    <div id="productEchart" ref="echartCateId" style="width: 100%;height:500px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "ModelTypeInfo",
    data() {
        return {
            option: {
                title: [
                    {
                        text: this.$t("model.layout.barTitle"),
                        left: "center",
                        top: "10px"
                    }
                ],
                toolbox: {
                    orient: "vertical",
                    top: "30",
                    right: "5",
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        magicType: {
                            type: ["line"]
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: "axis"
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 10
                    }
                ],
                xAxis: {
                    type: "category",
                    name: this.$t("model.layout.model"),
                    data: []
                },
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("category.layout.proNumber")
                    }
                ],
                series: [
                    {
                        name: this.$t("category.layout.proNumber"),
                        data: [],
                        type: "bar",
                        yAxisIndex: 0,
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
                        name: this.$t("brand.layout.ratio"),
                        data: [],
                        type: "line",
                        symbolSize: 0,
                        lineStyle: {
                            width: 0,
                            color: "#000"
                        }
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

        var myChart = echarts.init(this.$refs.echartCateId);
        myChart.clear();
    },
    methods: {
        initEcharts() {
            var myChart = echarts.init(this.$refs.echartCateId);
            myChart.clear();
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "ModelLayout/GetModelProductAccount")
                .then(response => {
                    let tempData = response.data.data;

                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.xAxis.data[i] = tempData[i].model;
                        this.option.series[0].data[i] = tempData[i].total;
                        this.option.series[1].data[i] = tempData[i].percent;
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
