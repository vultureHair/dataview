<template>
    <div>
        <h3>{{ $t("product.list.title") }}</h3>
        <div id="GridCenter" style="width: 100%;height: 650px;" class="ag-theme-balham"></div>
    </div>
</template>

<script>
export default {
    name: "ProductList",
    data() {
        return {
            tableData: "",
            pid: "",
            msgError: "",
            columnsName: [
                {
                    field: "PId",
                    headerName: this.$t("product.list.proId"),
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
                    field: "Barcode",
                    headerName: this.$t("product.list.barcode")
                },
                {
                    field: "SumTotalSalesAsDays",
                    headerName: this.$t("product.list.salesQuantity")
                },
                {
                    field: "inventory",
                    headerName: this.$t("product.list.inventory")
                },
                {
                    field: "ProductImgCount",
                    headerName: this.$t("product.list.imgCount")
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
        getDataa() {
            let sessionPid = sessionStorage.getItem("pid");

            if (sessionPid == null) {
                this.pid = this.$route.query.pid;

                if (this.pid == undefined) {
                    this.pid =
                        "123730_123600_123601_123602_123460_123603_123604_123605_123606_123607_123532_123608_123609_123533_123735_123599_123450_123451_123452_123531_123453_123454_123455_123456_123457_123458_123280_123281_123459_123842_123843_123844_123845_123846_123931_123932_123933_123934_123286_123287_123381_123734_123793_123840_123841_123857_123022_123023_123024_123029_123030_123053_123054_123055_123056_123057_123058_123059_122783_122784";
                }
            } else {
                this.pid = sessionPid;
            }

            this.axios
                .get(this.GLOBAL.urlHead + "ProductDetail/getproductdetaillist?product=" + this.pid)
                .then(response => {
                    this.tableData = response.data.data;
                    this.initGrid();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        getData() {
            let sessionPid = sessionStorage.getItem("pid");

            if (sessionPid == null || sessionPid == "undefined") {
                this.pid = this.$route.query.pid;
                if (this.pid == undefined) {
                    //获取最近3月销售前100产品的数据
                    this.axios
                        .get(this.GLOBAL.urlHead + "ProductDetail/getTopProductdetailList")
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
                onRowClicked: function(event) {
                    window.location.href =
                        "http://data.ivalor.com/#/productInfo?barCode=" +
                        event.data.Barcode +
                        "&daycount=180";
                }
            };
            var eGridDiv = document.querySelector("#GridCenter");
            // eslint-disable-next-line no-undef
            new agGrid.Grid(eGridDiv, gridOptions);
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
</style>
