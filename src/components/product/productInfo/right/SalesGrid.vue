<template>
  <div>
    <h3>产品销售一览表</h3>
    <p class="showData">（显示最新20条数据）</p>
    <div
      id="GridCenter"
      style="width: 100%;height: 410px;"
      class="ag-theme-balham"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SalesGrid",
  data() {
    return {
      barCode: "",
      tableData: "",
      columnsName: [
        {
          field: "Quantity",
          headerName: "销量"
        },
        {
          field: "price",
          headerName: "单价"
        },
        {
          field: "Order_Date",
          headerName: "销售日期"
        },
        {
          field: "customer",
          headerName: "客户编号"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1. 从route中获取barCode
      // 2.若不存在，则从缓存中获取
      // 3.若仍不存在，则加载空表

      this.barCode = this.$route.query.barCode;

      if (!this.barCode) {
        let sessionBarcode = sessionStorage.getItem("barCode");

        if (sessionBarcode != null || sessionBarcode != undefined) {
          this.barCode = sessionBarcode;
        }
      }

      this.axios
        .get(
          this.GLOBAL.urlHead + "ProductDetail/GetProductDetailSales?barCode=" +
            this.barCode
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
      var eGridDiv = document.querySelector("#GridCenter");
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
