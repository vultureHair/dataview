<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "CustomerProductTop",
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
                    text: this.$t("customer.info.topTitle"),
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
                        name: this.$t("customer.info.orderQuantity"),
                        splitLine: false
                    },
                    {
                        type: "value",
                        name: this.$t("customer.info.orderQuantity"),
                        show: false,
                        splitLine: false
                    }
                ],
                series: [
                    {
                        name: this.$t("customer.info.orderQuantity"),
                        type: "bar",
                        barMinHeight: "3",
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#83bff6" },
                                { offset: 0.5, color: "#188df0" },
                                { offset: 1, color: "#188df0" }
                            ])
                        },
                        data: []
                    },
                    {
                        name: this.$t("customer.info.orderAccount"),
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
            customer: ""
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
        },
        getData() {
            this.customer = this.$route.query.customer;

            if (!this.customer) {
                let sessioncustomer = sessionStorage.getItem("customer");

                if (sessioncustomer != null || sessioncustomer != undefined) {
                    this.customer = sessioncustomer;
                }
            }
            this.axios
                .get(
                    this.GLOBAL.urlHead + "CustomerInfo/GetCustomerProductTopsales?customer=" +
                        this.customer +
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
                        this.option.xAxis[0].data[i - 1] = tempData[i - 1].sil_No_;
                        this.option.xAxis[1].data[i - 1] = "Top" + i;
                        this.option.series[0].data[i - 1] = tempData[i - 1].totalValue;
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
