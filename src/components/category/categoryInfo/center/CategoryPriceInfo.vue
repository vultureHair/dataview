<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "CategoryPriceInfo",
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
                        end: 100,
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
                        name: this.$t("product.info.salesQuantity"),
                        splitLine: false
                    },
                    {
                        type: "value",
                        name: this.$t("product.info.salesQuantity"),
                        splitLine: false,
                        show: false
                    }
                ],
                series: [
                    {
                        name: this.$t("category.info.salesTotalQuantity"),
                        type: "bar",
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#83bff6" },
                                { offset: 0.5, color: "#188df0" },
                                { offset: 1, color: "#188df0" }
                            ])
                        },
                        data: [],
                        barMinHeight: 3
                    },
                    {
                        name: this.$t("category.info.salesTotalaccount"),
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
            categoryNameId: "",
            productBarcode: []
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
            //   console.log(param.dataIndex);
            //   console.log(this.productBarcode);
            //   // location.href =
            //   //   "/categoryInfo?categoryNameId=" + param.data.CategoryNameId;
            // });
        },
        getData() {
            this.categoryNameId = this.$route.query.categoryNameId;

            if (!this.categoryNameId) {
                let sessioncategoryNameId = sessionStorage.getItem("categoryNameId");

                if (sessioncategoryNameId != null || sessioncategoryNameId != undefined) {
                    this.categoryNameId = sessioncategoryNameId;
                }
            }
            this.axios
                .get(
                    this.GLOBAL.urlHead + "CategoryDetail/GetCategoryProductTopsalsales?categoryNameId=" +
                        this.categoryNameId +
                        "&day=" +
                        this.day
                )
                .then(response => {
                    let tempData = response.data.data;
                    this.option.xAxis[0].data = [];
                    this.option.xAxis[1].data = [];
                    this.option.series[0].data = [];
                    this.option.series[1].data = [];
                    this.productBarcode = [];

                    for (let i = 1; i <= response.data.data.length; i++) {
                        this.option.xAxis[0].data[i - 1] = tempData[i - 1].ProductId;
                        this.option.xAxis[1].data[i - 1] = "Top" + i;
                        this.option.series[0].data[i - 1] = tempData[i - 1].totalQuantity;
                        this.option.series[1].data[i - 1] = tempData[i - 1].totalPrice;
                        this.productBarcode[i - 1] = response.data.data[i - 1].Barcode;
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
