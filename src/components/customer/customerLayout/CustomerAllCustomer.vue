<template>
    <div>
        <h3>{{ this.$t("customer.layout.title") }}</h3>
        <p class="showData">{{ this.$t("customer.layout.model") }}</p>
        <div id="GridCategory" style="width: 100%;height: 400px;" class="ag-theme-balham"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "CustomerAllCustomer",
    data() {
        return {
            tableData: "",
            columnsName: [
                {
                    field: "customer",
                    headerName: this.$t("customer.layout.customerId"),
                    pinned: "left"
                },
                {
                    field: "orderTotal",
                    headerName: this.$t("customer.layout.order")
                },
                {
                    field: "totalValue",
                    headerName: this.$t("customer.layout.orderQuantity")
                },
                {
                    field: "totalPrice",
                    headerName: this.$t("customer.layout.orderAccount")
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.axios
                .get(this.GLOBAL.urlHead + "CustomerLayout/getCustomerList")
                .then(response => {
                    this.tableData = response.data.data;
                    this.initGrid();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        initGrid() {
            $("#GridCategory").empty();

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
                        "http://data.ivalor.com/#/customerInfo?customer=" + event.data.customer;
                }
            };
            var eGridDiv = document.querySelector("#GridCategory");
            // eslint-disable-next-line no-undef
            new agGrid.Grid(eGridDiv, gridOptions);
        }
    }
};
</script>

<style scoped>
.showData {
    margin: -15px 0 20px 0;
    font-size: 14px;
}
</style>
