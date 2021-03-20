<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";

export default {
    name: "ProductForth",
    data() {
        return {
            barCode: "",
            optionPie: {
                color: [
                    "#C33531",
                    "#64BD3D",
                    "#EE9201",
                    "#29AAE3",
                    "#B74AE5",
                    "#0AAF9F",
                    "#E89589",
                    "#6F3FE1",
                    "#5781FD",
                    "#4DB1CB",
                    "#3EBD7C",
                    "#F7A925",
                    "#bda29a"
                ],
                title: {
                    text: this.$t("product.info.pieTitleCustomerGrade"),
                    left: "center",
                    top: 10
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false,
                    orient: "vertical", //horizontal
                    left: "10", //left center right
                    data: []
                },
                series: [
                    {
                        name: this.$t("product.info.orderQty"),
                        type: "pie",
                        radius: "65%",
                        center: ["50%", "55%"],
                        minAngle: 5,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        data: "",
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
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

        var echarts = require("echarts");
        var myChart = echarts.init(this.$refs.echartId);
        myChart.clear();
    },
    methods: {
        getData() {
            this.GetBarcode();

            this.axios
                .get(this.GLOBAL.urlHead + "ProductDetail/getsalequantitybybarcodePie?barCode=" + this.barCode)
                .then(response => {
                    let tempData = response.data.data;

                    for (let i = 0; i < tempData.length; i++) {
                        this.optionPie.legend.data[i] = tempData[i].name;
                    }

                    this.optionPie.series[0].data = tempData;

                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        initEcharts() {
            var echarts = require("echarts");
            var myChart = echarts.init(this.$refs.echartId);
            myChart.setOption(this.optionPie);

            $(window).resize(function() {
                myChart.resize();
            });

            myChart.on("dblclick", function(param) {
                location.href = "/#/customerInfo?customer=" + param.name;
            });
        }
    }
};
</script>

<style scoped>
.switchButton {
    padding: 10px 20px 0 20px;
    text-align: left;
}
</style>
