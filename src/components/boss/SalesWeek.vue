<template>
    <div id="productEchart" ref="echartId" style="width: 100%;height:300px;"></div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "SalesWeek",
    data() {
        return {
            option: {
                title: {
                    text: this.$t("boss.weekChart"),
                    left: "center",
                    subtext: this.$t("boss.weekChart2")
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            formatter: function(params) {
                                let year = String(params.value).substr(0, 4);
                                let week = String(params.value).substr(4, 2);

                                function getNextDate(nowDate, weekDay) {
                                    // 0是星期日,1是星期一,...
                                    weekDay %= 7;
                                    var day = nowDate.getDay();
                                    var time = nowDate.getTime();
                                    var sub = weekDay - day;
                                    if (sub <= 0) {
                                        sub += 7;
                                    }
                                    time += sub * 24 * 3600000;
                                    nowDate.setTime(time);
                                    return nowDate;
                                }

                                function getXDate(year, weeks, weekDay) {
                                    // 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日
                                    // 因为计算机中的月份是从0开始的,所以有如下的构造方法
                                    var date = new Date(year, "0", "1");
                                    // 取得这个日期对象 date 的长整形时间 time
                                    var time = date.getTime();
                                    // 将这个长整形时间加上第N周的时间偏移
                                    // 因为第一周就是当前周,所以有:weeks-1,以此类推
                                    // 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
                                    time += (weeks - 1) * 7 * 24 * 3600000;
                                    // 为日期对象 date 重新设置成时间 time
                                    date.setTime(time);
                                    return getNextDate(date, weekDay);
                                }

                                //将标准时间转换为只包含年月日的时间格式
                                let date = getXDate(year, week, 7);
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                m = m < 10 ? "0" + m : m;
                                var d = date.getDate();
                                d = d < 10 ? "0" + d : d;
                                let time = y + "-" + m + "-" + d;

                                return time + "";
                            }
                        }
                    }
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
                        type: "slider",
                        show: true,
                        start: 80,
                        end: 100
                    }
                ],
                xAxis: {
                    type: "category",
                    name: this.$t("boss.xCoordinate1"),
                    data: []
                },
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("boss.yCoordinate1"),
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        type: "value",
                        name: this.$t("boss.yCoordinate2"),
                        splitLine: {
                            show: false
                        }
                    }
                ],
                legend: {
                    data: [this.$t("boss.yCoordinate1"), this.$t("boss.yCoordinate2")],
                    left: "0",
                    top: "0"
                },
                grid: {
                    right: "15%"
                },
                series: [
                    {
                        name: this.$t("boss.yCoordinate1"),
                        data: [],
                        type: "bar",
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
                        name: this.$t("boss.yCoordinate2"),
                        data: [],
                        type: "line",
                        yAxisIndex: 1,
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
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });
        },
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "Boss/GetBossProductCount?type=2")
                .then(response => {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.option.xAxis.data[i] = response.data.data[i].seriesX;
                        this.option.series[0].data[i] = response.data.data[i].totalQuantity;
                        this.option.series[1].data[i] = response.data.data[i].totalPrice;
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
