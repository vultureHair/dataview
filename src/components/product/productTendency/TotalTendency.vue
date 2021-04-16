<template>
    <div>
        <div class="left">
            <div class="switchDayCount">
                <span>{{ $t("product.tendency.switchTime") }}</span>
                <select id="dayCount" class="switchOption" @change="changeDay()">
                    <option value="b">{{ $t("product.tendency.switchInfo") }}</option>
                    <option value="a">{{ $t("product.tendency.switchInfo1") }}</option>
                    <option value="c">{{ $t("product.tendency.switchInfo2") }}</option>
                </select>
            </div>
        </div>
        <div id="productEchart" ref="echartId" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "TotalTendency",
    data() {
        return {
            option: {
                color: ["#3398DB", "#3398DB"],
                title: [
                    {
                        text: this.$t("product.tendency.lineTitle"),
                        left: "center"
                    }
                ],
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
                        magicType: {
                            type: ["bar"]
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                axisPointer: {
                    link: { xAxisIndex: "all" }
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
                        name: this.$t("product.tendency.salesDate"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500
                    },
                    {
                        type: "category",
                        name: this.$t("product.tendency.salesDate"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500,
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("product.tendency.salesQuantity")
                    },
                    {
                        type: "value",
                        name: this.$t("product.tendency.salesAmount"),
                        gridIndex: 1
                    }
                ],
                grid: [
                    {
                        bottom: "60%"
                    },
                    {
                        top: "60%"
                    }
                ],
                series: [
                    {
                        name: "销量",
                        data: [],
                        type: "line"
                    },
                    {
                        name: "销售额",
                        data: [],
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }
                ]
            },
            dataType: "b",
            bgColor: {
                "background-color": "white"
            }
        };
    },
    created() {
        this.getData();
    },
    mounted() {},
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
            this.axios
                .get(this.GLOBAL.urlHead + "ProductTotalTendency/GetProductTotal?dataType=" + this.dataType)
                .then(response => {
                    let tempData = response.data.data;
                    this.option.xAxis[0].data.length = 0;
                    this.option.xAxis[1].data.length = 0;
                    this.option.series[0].data.length = 0;
                    this.option.series[1].data.length = 0;

                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.xAxis[0].data[i] = tempData[i].date;
                        this.option.xAxis[1].data[i] = tempData[i].date;
                        this.option.series[0].data[i] = tempData[i].totalNumber;
                        this.option.series[1].data[i] = tempData[i].totalSales;
                    }
                    if (this.dataType == "a") {
                        this.option.dataZoom[0].start = 90;
                    } else if (this.dataType == "b") {
                        this.option.dataZoom[0].start = 60;
                    } else {
                        this.option.dataZoom[0].start = 0;
                    }

                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeDay() {
            var mySelect = document.getElementById("dayCount");
            this.dataType = mySelect.options[mySelect.selectedIndex].value;
            this.getData();
        }
    }
};
</script>

<style scoped>
.btnContainer {
    text-align: left;
    padding-left: 20px;
}

.switctBtn {
    border: 1px solid black;
    padding: 3px 10px;
    margin-right: 10px;
    margin-top: 5px;
    border-radius: 3px;
}

.switchDayCount {
    height: 30px;
    /* display: flex;
  justify-content: flex-start;
  align-items: center; */
    padding-left: 10px;
    display: inline;
    padding-right: 10px;
}

.left {
    text-align: left;
    padding-top: 5px;
}

.switchOption {
    margin-left: 10px;
}
</style>
