<template>
    <div>
        <h3>{{ $t("product.list.title") }}</h3>
        <div class="switchDayCount">
            <span>{{ $t("boss.switchTime") }}</span>
            <select id="dayCount" class="" @change="changeDay()">
                <option value="30">{{ $t("boss.switchTimeInfo") }}</option>
                <option value="90">{{ $t("boss.switchTimeInfo1") }}</option>
                <option value="180">{{ $t("boss.switchTimeInfo2") }}</option>
                <option value="365">{{ $t("boss.switchTimeInfo3") }}</option>
                <option value="5475">{{ $t("boss.switchTimehistory") }}</option>
            </select>
        </div>
        <div id="GridCenter" style="width: 100%;height: 650px;" class="ag-theme-balham"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "ProductList",
    data() {
        return {
            tableData: "",
            pid: "",
            msgError: "",
            dayCount: 30,
            columnsName: [
                {
                    field: "PId",
                    headerName: this.$t("product.list.proId"),
                    pinned: "left"
                },
                {
                    field: "Barcode",
                    headerName: this.$t("product.list.barcode"),
                    pinned: "left"
                },
                {
                    field: "ProductId",
                    headerName: this.$t("product.list.proCode"),
                    pinned: "left"
                },
                {
                    field: "PName",
                    headerName: this.$t("product.list.proName")
                },
                {
                    field: "SumTotalSalesAsDays",
                    headerName: this.$t("product.list.salesQuantity")
                },
                {
                    field: "weekSales",
                    headerName: this.$t("product.list.weekSales")
                },
                {
                    field: "monthSales",
                    headerName: this.$t("product.list.monthSales")
                },
                {
                    field: "yearSales",
                    headerName: this.$t("product.list.yearSales")
                },
                {
                    field: "inventory",
                    headerName: this.$t("product.list.inventory")
                },
                {
                    field: "AddDate",
                    headerName: this.$t("product.list.AddDate")
                },
                {
                    field: "brand",
                    headerName: this.$t("product.list.brand")
                },
                {
                    field: "CategoryName",
                    headerName: this.$t("product.list.categoryName")
                }
            ]
        };
    },
    mounted() {
        this.getData();
    },
    beforeDestroy() {
        sessionStorage.removeItem("pid");
        sessionStorage.setItem("pid", this.pid);
    },
    methods: {
        getData() {
            let sessionPid = sessionStorage.getItem("pid");

            if (sessionPid == null || sessionPid == "undefined") {
                this.pid = this.$route.query.pid;
                if (this.pid == undefined) {
                    //获取最近一年销售产品的数据
                    this.axios
                        .get(
                            this.GLOBAL.urlHead +
                                "ProductDetail/getTopProductdetailList?dayCount=" +
                                this.dayCount
                        )
                        .then(response => {
                            this.tableData = response.data.data;
                            this.initGrid();
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            } else {
                //获取从mobile.2valor.com中传递过来的产品数据
                this.pid = sessionPid;
                this.axios
                    .get(
                        this.GLOBAL.urlHead +
                            "ProductDetail/getproductdetaillist?product=" +
                            this.pid
                    )
                    .then(response => {
                        this.tableData = response.data.data;
                        this.initGrid();
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        initGrid() {
            $("#GridCenter").empty();

            var gridOptions = {
                columnDefs: this.columnsName,
                rowData: this.tableData,
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
                        "http://data.ivalor.com/#/productInfo?barCode=" +
                        event.data.Barcode +
                        "&daycount=180";
                }
            };
            var eGridDiv = document.querySelector("#GridCenter");
            // eslint-disable-next-line no-undef
            new agGrid.Grid(eGridDiv, gridOptions);
        },
        changeDay() {
            var mySelect = document.getElementById("dayCount");
            this.dayCount = mySelect.options[mySelect.selectedIndex].value;

            this.getData();
        }
    }
};
</script>

<style scoped>
h3 {
    margin: 20 0 20px 0;
}
.ag-theme-balham {
    padding: 0 20px 0 20px;
}

.switchDayCount {
    height: 30px;
    padding-left: 10px;
    display: table;
}
</style>
