<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");
var colors = ["#C33531", "#64BD3D", "#EE9201", "#29AAE3", "#B74AE5", "#0AAF9F", "#E89589"];

export default {
    name: "TopGrade",
    data() {
        return {
            barCode: "",
            option: {
                title: {
                    text: this.$t("product.info.customerTop10"),
                    left: "center",
                    top: 10
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross"
                    },
                    backgroundColor: "rgba(245, 245, 245, 0.8)",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    textStyle: {
                        color: "#000"
                    }
                },
                toolbox: {
                    orient: "vertical",
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        axisLabel: {
                            interval: 0,
                            rotate: 15
                        },
                        data: []
                    },
                    {
                        show: false,
                        type: "category",
                        data: [
                            "Top1",
                            "Top2",
                            "Top3",
                            "Top4",
                            "Top5",
                            "Top6",
                            "Top7",
                            "Top8",
                            "Top9",
                            "Top10"
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("product.info.orderQty"),
                        boundaryGap: [0, 0.1],
                        splitLine: false
                    }
                ],
                series: [
                    {
                        name: this.$t("product.info.orderQty"),
                        type: "bar",
                        itemStyle: {
                            normal: {
                                color: function(obj) {
                                    if (obj.dataIndex >= 0) {
                                        return colors[obj.dataIndex];
                                    }
                                },
                                barBorderWidth: 0,
                                barBorderRadius: 1,
                                label: {
                                    show: false,
                                    position: "insideTop"
                                }
                            }
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
    mounted() {},
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

            // myChart.on("dblclick", function(param) {
            //     location.href = "/#/modelInfo?model=" + param.name;
            // });
        },
        getData() {
            this.GetBarcode();

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductDetail/getsalequantitybybarcodePie?barCode=" +
                        this.barCode
                )
                .then(response => {
                    for (let i = 0; i < response.data.data.length && i < 10; i++) {
                        this.option.xAxis[0].data[i] = response.data.data[i].pet;
                        this.option.series[0].data[i] = response.data.data[i].value;
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
