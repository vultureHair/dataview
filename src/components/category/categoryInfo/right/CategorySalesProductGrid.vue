<template>
    <div>
        <h3>类别产品销售数据</h3>
        <p class="showData">（显示最新100条数据）</p>
        <div id="GridSales" style="width: 100%;height: 400px;" class="ag-theme-balham"></div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "CategorySalesProductGrid",
    data() {
        return {
            categoryNameId: "",
            tableData: "",
            columnsName: [
                {
                    field: "sil_No_",
                    headerName: "条形码",
                    pinned: "left"
                },
                {
                    field: "sih_No_",
                    headerName: "订单号"
                },
                {
                    field: "Order_Date",
                    headerName: "下单日期"
                },
                {
                    field: "Quantity",
                    headerName: "购买数量"
                },
                {
                    field: "Unit_Price",
                    headerName: "单价"
                },
                {
                    field: "Bill_to_Customer_No",
                    headerName: "客户Id"
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.GetcategoryNameId();

            this.axios
                .get(
                    this.GLOBAL.urlHead + "CategoryDetail/GetCategoryProductsales?categoryNameId=" +
                        this.categoryNameId
                )
                .then(response => {
                    this.tableData = response.data.data;
                    this.initGrid();
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        initGrid() {
            $("#GridSales").empty();

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
                paginationAutoPageSize: true //根据网页高度自动分页（前端分页）
            };
            var eGridDiv = document.querySelector("#GridSales");
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
