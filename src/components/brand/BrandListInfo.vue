<template>
    <div class="container-grid">
        <div id="GridBrandList" class="ag-theme-balham grid"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "BrandList",
    data() {
        return {
            day: "",
            week: "",
            month: "",
            amount: "",
            period: 5,
            total: [],
            headerName: []
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        async getData() {
            //获取最近5天数据
            await this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetCategoryGroupSaleInfo?vdoing=2&datetype=1&num=" +
                        this.period
                )
                .then(response => {
                    this.day = response.data.data;
                    this.headerName = response.data.Order_Date;
                })
                .catch(function(error) {
                    console.log(error);
                });

            //获取最近5周数据
            await this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetCategoryGroupSaleInfo?vdoing=2&datetype=2&num=" +
                        this.period
                )
                .then(response1 => {
                    this.week = response1.data.data;
                    this.headerName = this.headerName.concat(response1.data.Order_Date);
                })
                .catch(function(error) {
                    console.log(error);
                });

            //获取最近5月数据
            await this.axios
                .get(
                    this.GLOBAL.urlHead +
                        "ProductTotalTendency/GetCategoryGroupSaleInfo?vdoing=2&datetype=3&num=" +
                        this.period
                )
                .then(response => {
                    this.month = response.data.data;
                    this.headerName = this.headerName.concat(response.data.Order_Date);

                    // let temp;
                    // for (let i = 0; i < this.day.length; i++) {
                    //     temp = Object.assign(this.day[i], this.amount[i]);
                    //     this.total[i] = temp;
                    // }
                })
                .catch(function(error) {
                    console.log(error);
                });

            //获取产品历史累积销售数据
            await this.axios
                .get(this.GLOBAL.urlHead + "ProductTotalTendency/GetCategoryGroupSaleInfo?vdoing=2")
                .then(response => {
                    this.amount = [];
                    this.amount = response.data.data;

                    let temp;
                    for (let i = 0; i < this.day.length; i++) {
                        temp = Object.assign(
                            this.day[i],
                            this.week[i],
                            this.month[i],
                            this.amount[i]
                        );
                        this.total[i] = temp;
                    }
                    this.headerName.push("Quantity");
                    this.headerName.push("BrandId");
                    this.headerName.push("Brand");
                })
                .catch(function(error) {
                    console.log(error);
                });

            this.total = this.sortByKey(this.total, "Quantity");
            this.initGrid();
        },
        initGrid() {
            $("#GridBrandList").empty();

            let headLeft = [
                {
                    headerName: "",
                    children: [
                        { headerName: "id", field: "Id", pinned: "left" },
                        { headerName: "brand", field: "Name", pinned: "left" }
                    ]
                },
                {
                    headerName: "近" + this.period + "日",
                    children: []
                },
                {
                    headerName: "近" + this.period + "周",
                    children: []
                },
                {
                    headerName: "近" + this.period + "月",
                    children: []
                },
                {
                    headerName: "历史累积",
                    field: "Quantity"
                }
            ];

            for (let i = 0; i < this.period; i++) {
                let temp = {
                    field: this.headerName[i],
                    headerName: this.headerName[i]
                };
                headLeft[1].children[i] = temp;
            }

            for (let i = this.period; i < this.period * 2; i++) {
                let temp = {
                    field: this.headerName[i],
                    headerName: this.headerName[i]
                };
                headLeft[2].children[i] = temp;
            }

            for (let i = this.period * 2; i < this.period * 3; i++) {
                let temp = {
                    field: this.headerName[i],
                    headerName: this.headerName[i]
                };
                headLeft[3].children[i] = temp;
            }

            var gridOptions = {
                columnDefs: headLeft,
                rowData: this.total,
                onGridReady: function() {
                    //表格创建完成后执行的事件
                    gridOptions.api.sizeColumnsToFit(); //调整表格大小自适应
                },
                defaultColDef: {
                    editable: false, //单元表格是否可编辑
                    enableValue: true,
                    sortable: true, //开启排序
                    resizable: true, //是否可以调整列大小，就是拖动改变列大小
                    filter: true //开启刷选
                },
                pagination: true, //开启分页（前端分页）
                paginationAutoPageSize: true, //根据网页高度自动分页（前端分页）
                onRowDoubleClicked: function(event) {
                    window.location.href =
                        "http://data.ivalor.com/#/brandInfo?BrandId=" + event.data.Id;
                }
            };
            var eGridDiv = document.querySelector("#GridBrandList");
            // eslint-disable-next-line no-undef
            new agGrid.Grid(eGridDiv, gridOptions);
        },
        sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                return x > y ? -1 : x < y ? 1 : 0;
            });
        }
    }
};
</script>

<style scoped>
.container-grid {
    text-align: center;
}

.grid {
    width: 100%;
    height: 700px;
    display: inline-block;
}
</style>
