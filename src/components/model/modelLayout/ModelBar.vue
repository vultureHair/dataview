<template>
    <div>
        <div class="switchDayCount">
            <span>{{ $t("product.info.switchTime") }}</span>
            <select id="barDayCount" class="" @change="changeDay()">
                <option value="30">{{ $t("product.tendency.switchInfo3") }}</option>
                <option value="90">{{ $t("product.tendency.switchInfo4") }}</option>
                <option value="180">{{ $t("product.tendency.switchInfo5") }}</option>
                <option value="365">{{ $t("product.tendency.switchInfo6") }}</option>
            </select>
        </div>
        <div id="BarEchart" ref="echartId" style="width: 100%;height:300px;"></div>
    </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "ModelTreeBar",
    data() {
        return {
            option: {
                title: {
                    text: this.$t("model.layout.title"),
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
                    trigger: "axis"
                },
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        start: 0,
                        end: 30
                    }
                ],
                xAxis: {
                    type: "category",
                    name: this.$t("style.layout.style"),
                    data: []
                },
                yAxis: {
                    type: "value",
                    name: this.$t("category.layout.salesQuantity")
                },
                series: [
                    {
                        name: this.$t("category.layout.salesQuantity"),
                        type: "bar",
                        data: [],
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
                    }
                ]
            },
            dayCount: 30
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
                .get(this.GLOBAL.urlHead + "CategoryLayout/getCategorySalesBar?dayCount=" + this.dayCount)
                .then(response => {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.series[0].data[i] = response.data.data[i].quantity;

                        this.option.xAxis.data[i] = response.data.data[i].CategoryName;
                    }

                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeDay() {
            var mySelect = document.getElementById("barDayCount");
            this.dayCount = mySelect.options[mySelect.selectedIndex].value;

            this.getData();
        }
    }
};
</script>

<style scoped>
.switchDayCount {
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
}

.salesTotal {
    margin-left: 20px;
}
</style>
