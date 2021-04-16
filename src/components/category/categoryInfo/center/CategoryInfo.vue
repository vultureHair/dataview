<template>
    <div>
        <div class="container-btn">
            <div class="switchDayCount">
                <span>{{ $t("product.info.switchTime") }}</span>
                <select id="dayCount" class="" @change="changeOption()">
                    <option value="2">{{ $t("product.info.switchInfo3") }}</option>
                    <option value="3">{{ $t("product.info.switchInfo4") }}</option>
                    <option value="5">{{ $t("product.info.switchInfo5") }}</option>
                    <option value="1">{{ $t("product.info.switchInfo") }}</option>
                    <option value="4">{{ $t("product.info.switchInfo1") }}</option>
                    <option value="8">{{ $t("product.info.switchInfo2") }}</option>
                    <option value="6">{{ $t("product.info.switchInfo6") }}</option>
                    <option value="7">{{ $t("product.info.switchInfo7") }}</option>
                    <option value="10">{{ $t("product.info.switchInfo8") }}</option>
                </select>
            </div>
        </div>
        <div id="productEchart" ref="echartId" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "CategoryInfoEchart",
    data() {
        return {
            option: {
                color: ["#3398DB", "#3398DB"],
                title: {
                    text: "类别销量——销售走势图",
                    left: "center",
                    top: "10px"
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        label: {
                            formatter: function(params) {
                                if (String(params.value).length == 6) {
                                    let year = String(params.value).substr(0, 4);
                                    let week = String(params.value).substr(4, 2);

                                    // eslint-disable-next-line no-inner-declarations
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

                                    // eslint-disable-next-line no-inner-declarations
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
                                } else {
                                    return params.value;
                                }
                            }
                        }
                    }
                },
                axisPointer: {
                    link: { xAxisIndex: "all" }
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
                            type: ["line"]
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
                        name: this.$t("product.info.salesQuantity"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500
                    },
                    {
                        type: "category",
                        name: this.$t("product.info.salesDate"),
                        data: [],
                        large: true, //开启渐进式优化，largeThreshold为每帧至多渲染数据量
                        largeThreshold: 500,
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: this.$t("product.info.salesQuantity")
                    },
                    {
                        type: "value",
                        name: this.$t("product.info.salesAmount"),
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
                        name: this.$t("product.info.salesQuantity"),
                        data: [],
                        type: "bar"
                    },
                    {
                        name: this.$t("product.info.salesAmount"),
                        data: [],
                        type: "bar",
                        xAxisIndex: 1,
                        yAxisIndex: 1
                    }
                ]
            },
            categoryNameId: "",
            categoryName: "",
            dayCount: "90",
            period: "week"
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
            myChart.clear();
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });
        },
        getData() {
            this.categoryNameId = this.$route.query.categoryNameId;

            //直接进入详情页面，缓存categoryNameId
            if (!this.categoryNameId) {
                let sessioncategoryNameId = sessionStorage.getItem("categoryNameId");

                if (
                    // sessioncategoryNameId != null ||
                    sessioncategoryNameId != undefined
                ) {
                    this.categoryNameId = sessioncategoryNameId;
                }
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "CategoryDetail/GetCategorySalesDetail?categoryNameId=" +
                        this.categoryNameId +
                        "&dayCount=" +
                        this.dayCount +
                        "&period=" +
                        this.period
                )
                .then(response => {
                    this.option.xAxis[0].data.length = 0;
                    this.option.xAxis[1].data.length = 0;
                    this.option.series[0].data.length = 0;
                    this.option.series[1].data.length = 0;

                    //将季节和月横坐标数据加上-，以便使周横坐标能够自动转换成日期
                    if (this.period == "season" || this.period == "month") {
                        for (let i = 0; i < response.data.data.length; i++) {
                            let year = String(response.data.data[i].date).substr(0, 4);
                            let season = String(response.data.data[i].date).substr(4, 2);
                            let temp = year + "-" + season;
                            this.option.xAxis[0].data[i] = temp;
                            this.option.xAxis[1].data[i] = temp;

                            this.option.series[0].data[i] = response.data.data[i].total;
                            this.option.series[1].data[i] = response.data.data[i].price;
                        }
                    } else {
                        for (let i = 0; i < response.data.data.length; i++) {
                            this.option.xAxis[0].data[i] = response.data.data[i].date;
                            this.option.xAxis[1].data[i] = response.data.data[i].date;
                            this.option.series[0].data[i] = response.data.data[i].total;
                            this.option.series[1].data[i] = response.data.data[i].price;
                        }
                    }

                    if (response.data.data.length > 0) {
                        var this_ = this;
                        this.option.title.text =
                            //response.data.data[0].CategoryName +
                            this.categoryName + this_.$t("category.info.lineTitle");
                    }

                    this.categoryName = response.data.data[0].CategoryName;

                    sessionStorage.removeItem("categoryNameId");
                    sessionStorage.setItem("categoryNameId", this.categoryNameId);
                    this.SetLocalStorage(2, this.categoryName, this.categoryNameId);
                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeOption() {
            var mySelect = document.getElementById("dayCount");
            var option = mySelect.options[mySelect.selectedIndex].value;

            if (option == 1) {
                this.dayCount = 90;
                this.period = "day";
            } else if (option == 2) {
                this.dayCount = 90;
                this.period = "week";
            } else if (option == 3) {
                this.dayCount = 180;
                this.period = "week";
            } else if (option == 4) {
                this.dayCount = 180;
                this.period = "day";
            } else if (option == 5) {
                this.dayCount = 365;
                this.period = "week";
            } else if (option == 6) {
                this.dayCount = 365;
                this.period = "month";
            } else if (option == 7) {
                this.dayCount = 365;
                this.period = "season";
            } else if (option == 8) {
                this.dayCount = 365;
                this.period = "day";
            } else if (option == 10) {
                this.dayCount = 1095;
                this.period = "year";
            } else {
                this.dayCount = 90;
                this.period = "day";
            }

            this.$emit("day", this.dayCount);
            this.getData();
        }
    }
};
</script>

<style scoped>
.inDayCount {
    width: 150px;
}
.container-btn {
    text-align: left;
    padding-top: 5px;
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
</style>
