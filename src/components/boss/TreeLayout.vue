<template>
    <div>
        <div class="switchDayCount">
            <span>{{ $t("boss.switchTime") }}</span>
            <select id="dayCount" class="" @change="changeDay()">
                <option value="30">{{ $t("boss.switchTimeInfo") }}</option>
                <option value="90">{{ $t("boss.switchTimeInfo1") }}</option>
                <option value="180">{{ $t("boss.switchTimeInfo2") }}</option>
                <option value="365">{{ $t("boss.switchTimeInfo3") }}</option>
            </select>
        </div>
        <div class="treeBtn">
            <button @click="changeType(1)">{{ $t("boss.category") }}</button>&nbsp;&nbsp;
            <button @click="changeType(2)">{{ $t("boss.brand") }}</button>&nbsp;&nbsp;
            <button @click="changeType(3)">{{ $t("boss.style") }}</button>&nbsp;&nbsp;
            <button @click="changeType(4)">{{ $t("boss.model") }}</button>
        </div>
        <!-- <div class="selectLevel">
            <span>选择下一层级：</span>
            <select id="nextLevel" class="" @change="changeNextLevel()">
                <option v-for="(item, key) in list" :key="key" :value="item.value">{{
                    item.name
                }}</option>
            </select>
            <span>&nbsp;&nbsp;当前层级:{{ track }}</span>
        </div> -->
        <div id="TreeEchart" ref="echartId" style="width: 100%;height:300px;"></div>
    </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "BrandTree",
    data() {
        return {
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
                    text: this.$t("boss.pieTitleTreeLayout"),
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
                            "销量: " +
                            info.data.value +
                            "<br/>" +
                            "销售比例: " +
                            info.data.percent
                        );
                    }
                },
                series: [
                    {
                        name: this.$t("product.info.salesQuantity"),
                        type: "treemap",
                        roam: "false",
                        label: {
                            formatter: function(a) {
                                return (
                                    a.name +
                                    "\n\n" +
                                    "销量：" +
                                    a.value +
                                    "\n\n所占比例：" +
                                    a.data.percent
                                );
                            }
                        },
                        data: ""
                    }
                ]
            },
            dayCount: 37,
            type: 1,
            nextLevel: 1,
            track: "类别",
            list: [
                { name: "类别", value: 1 },
                { name: "品牌", value: 2 },
                { name: "款式", value: 3 },
                { name: "型号", value: 4 }
            ]
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

            myChart.on("dblclick", param => {
                this.againGetData(param.value, param.data);
            });
        },
        getData() {
            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetSaleTotalByVdoingAndDays?vdoing=" +
                        this.type +
                        "&days=" +
                        this.dayCount
                )
                .then(response => {
                    this.option.series[0].data = response.data.data;
                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeDay() {
            var mySelect = document.getElementById("dayCount");
            this.dayCount = mySelect.options[mySelect.selectedIndex].value;

            this.getData();
        },
        changeType(params) {
            this.type = params;

            if (params == 1) {
                this.track = "类别";
            } else if (params == 2) {
                this.track = "品牌";
            } else if (params == 3) {
                this.track = "款式";
            } else {
                this.track = "型号";
            }
            this.getData();
        },
        againGetData(params, data) {
            let vdoing = this.nextLevel;
            let value = params;
            let CategoryId = 0;
            let pmid = "-404";
            let Brand = 0;
            let style = "default";

            if (data.CategoryNameId) {
                CategoryId = data.CategoryNameId;
            }
            if (data.pmid) {
                pmid = data.pmid;
            }
            if (data.Brand) {
                Brand = data.BrandId;
            }
            if (data.style) {
                style = data.style;
            }

            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetSaleTotalByFilter?vdoing=" +
                        vdoing +
                        "&days=" +
                        this.dayCount +
                        "&value=" +
                        value +
                        "&CategoryId=" +
                        CategoryId +
                        "&Brand=" +
                        Brand +
                        "&pmid=" +
                        pmid +
                        "&style=" +
                        style
                )
                .then(response => {
                    this.option.series[0].data = response.data.data;
                    this.initEcharts();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        changeNextLevel() {
            var mySelect = document.getElementById("nextLevel");
            this.nextLevel = mySelect.options[mySelect.selectedIndex].value;

            if (this.nextLevel == 1) {
                this.track = this.track + "-> 类别";
            } else if (this.nextLevel == 2) {
                this.track = this.track + "-> 品牌";
            } else if (this.nextLevel == 3) {
                this.track = this.track + "-> 款式";
            } else {
                this.track = this.track + "-> 型号";
            }
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

.treeBtn {
    float: left;
    position: absolute;
    right: 20px;
    top: 15px;
}

.treeBtn button:hover {
    filter: brightness(1.1);
    background-color: chartreuse;
}

.selectLevel {
    position: absolute;
    top: 15px;
    left: 250px;
}

button {
    border: 1px solid #000;
    background-color: #fff;
}
</style>
