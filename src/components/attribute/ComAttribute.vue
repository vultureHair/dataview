<template>
    <div>
        <div class="option">
            <el-select
                v-model="value1"
                :placeholder="$t('attribute.placeholder1')"
                @change="getStyle(value1)"
            >
                <el-option
                    v-for="item in options1"
                    :key="item.CategoryName"
                    :label="item.CategoryName"
                    :value="item.CategoryName"
                >
                </el-option>
            </el-select>

            <el-select
                id="select2"
                ref="select2"
                v-model="value2"
                style="margin-left: 20px;"
                :placeholder="$t('attribute.placeholder2')"
                @change="getAttributeType(value2)"
            >
                <el-option
                    v-for="item in options2"
                    :key="item.Styletype"
                    :label="item.Styletype"
                    :value="item.Styletype"
                >
                </el-option>
            </el-select>

            <el-select
                id="select3"
                ref="select3"
                v-model="value3"
                style="margin-left: 20px;"
                :placeholder="$t('attribute.placeholder3')"
            >
                <el-option
                    v-for="item in options3"
                    :key="item.AttributeType"
                    :label="item.AttributeType"
                    :value="item.AttributeType"
                >
                </el-option>
            </el-select>

            <el-select
                v-model="value4"
                style="margin-left: 20px;"
                :placeholder="$t('attribute.placeholder4')"
            >
                <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>

            <el-button
                type="primary"
                style="margin-left: 20px;"
                icon="el-icon-search"
                @click="getData"
                >{{ $t("attribute.search") }}</el-button
            >
        </div>
        <div id="no-data" class="no-data">{{ $t("attribute.noData") }}</div>
        <div id="TreeEchart" ref="echartId" style="width: 100%;height:500px;"></div>
    </div>
</template>

<script>
import $ from "jquery";
var echarts = require("echarts");

export default {
    name: "ComAttribute",
    data() {
        return {
            options1: [],
            options2: [],
            options3: [],
            options4: [
                {
                    value: "30",
                    label: "最近一月"
                },
                {
                    value: "90",
                    label: "最近三月"
                },
                {
                    value: "180",
                    label: "最近半年"
                },
                {
                    value: "365",
                    label: "最近一年"
                },
                {
                    value: "5000",
                    label: "所有"
                }
            ],
            value1: [],
            value2: [],
            value3: [],
            value4: [],
            treeData: [],
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
                    text: this.$t("attribute.attributeTreeTitle"),
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
                        return info.data.name + "<br/>" + "销售总数: " + info.data.value + "<br/>";
                    }
                },
                series: [
                    {
                        name: this.$t("attribute.attributeName"),
                        type: "treemap",
                        roam: "move",
                        data: ""
                    }
                ]
            }
        };
    },
    mounted() {
        this.getOptions();
    },
    methods: {
        getOptions() {
            //获取所有类别
            this.axios
                .get(this.GLOBAL.urlHead + "Attribute/getallcategory")
                .then(response => {
                    this.options1 = response.data.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //获取所有款式
        getStyle(value1) {
            this.value2 = "";
            this.value3 = "";

            this.value1 = [];
            this.value1 = value1;
            this.axios
                .get(this.GLOBAL.urlHead + "Attribute/getStyle?CategoryName=" + value1)
                .then(response => {
                    this.options2 = [];
                    this.options2 = response.data.data;
                    this.options2.unshift({ Styletype: "all" });
                    console.log(this.options2);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //获取所有属性类别
        getAttributeType(value2) {
            this.value3 = "";

            this.value2 = [];
            this.value2 = value2;
            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "Attribute/getAttributeType?CategoryName=" +
                        this.value1 +
                        "&Styletype=" +
                        this.value2
                )
                .then(response => {
                    this.options3 = [];
                    this.options3 = response.data.data;
                    this.options3.unshift({ AttributeType: "all" });
                    console.log(this.options3);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getData() {
            console.log(this.value1);
            console.log(this.value2);
            console.log(this.value3);
            console.log(this.value4);
            //获取表格数据
            this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "Attribute/getAttributeDate?categoryName=" +
                        this.value1 +
                        "&Styletype=" +
                        this.value2 +
                        "&AttributeType=" +
                        this.value3 +
                        "&dayCount=" +
                        this.value4
                )
                .then(response => {
                    this.option.series[0].data = "";
                    this.option.series[0].data = response.data.data;
                    if (response.data.data.length > 0) {
                        this.initGrid();
                    } else {
                        //$("#TreeEchart").empty();
                        var myChart = echarts.init(this.$refs.echartId);
                        myChart.clear();
                        $("#no-data").toggle();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        initGrid() {
            var myChart = echarts.init(this.$refs.echartId);
            myChart.clear();
            myChart.setOption(this.option);

            $(window).resize(function() {
                myChart.resize();
            });
            // myChart.on("dblclick", param => {
            //     this.againGetData(param.value, param.data);
            // });
        }
    }
};
</script>

<style scoped>
.option {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 50px;
}

.no-data {
    display: none;
    color: red;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}
</style>
