<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";

export default {
    name: "ProductSecond",
    data() {
        return {
            dataa: this.$t,
            option: {
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
                    "#bda29a",
                    "#ca8622",
                    "#749f83",
                    "#6e7074",
                    "#546570",
                    "#c4ccd3"
                ],
                title: {
                    text: this.$t("product.info.pieTitleCustomerGrade"),
                    left: "center"
                },
                toolbox: {
                    orient: "vertical",
                    right: "5px",
                    top: "10px",
                    show: true,
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: function(info) {
                        return (
                            info.data.name +
                            "<br/>" +
                            "订购总数: " +
                            info.data.value +
                            "<br/>" +
                            "所占比例: " +
                            info.data.percent +
                            "%"
                        );
                    }
                },
                series: [
                    {
                        name: this.$t("product.info.pieTitleCustomerGrade"),
                        type: "treemap",
                        leafDepth: 1,
                        roam: "move",
                        label: {
                            formatter: function(a) {
                                return (
                                    a.name +
                                    "\n\n" +
                                    "订购总数：" +
                                    a.value +
                                    "\n\n所占比例：" +
                                    a.data.percent +
                                    "%"
                                );
                            }
                        },
                        data: ""
                    }
                ]
            },
            customerTreeData: "",
            barCode: ""
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
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });

            myChart.on("dblclick", function(param) {
                if (!param.data.children) {
                    location.href = "/#/customerInfo?customer=" + param.data.name;
                }
            });
        },
        getData() {
            this.GetBarcode();

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductDetail/getsalequantitybybarcode?barCode=" +
                        this.barCode
                )
                .then(response => {
                    this.option.series[0].data = response.data.data;

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
.switchButton {
    padding: 10px 20px 0 20px;
    text-align: left;
}
</style>
