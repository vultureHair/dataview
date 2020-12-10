<template>
  <div>
    <h3>产品关联一览表</h3>
    <p class="showData">（显示最近180天数据）</p>
    <div
      id="GridCategory"
      style="width: 100%;height: 400px;"
      class="ag-theme-balham"
    ></div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "ProductGrid",
  data() {
    return {
      barCode: "",
      tableData: "",
      columnsName: [
        {
          field: "coid",
          headerName: "产品ID",
          pinned: "left"
        },
        {
          field: "company",
          headerName: "条形码"
        },
        {
          field: "Quantity",
          headerName: "挂网日期"
        },
        {
          field: "Price",
          headerName: "累积销量"
        },
        {
          field: "OrderNum",
          headerName: "累积销售额"
        },
        {
          field: "inventory",
          headerName: "库存量"
        },
        {
          field: "SalesRatio",
          headerName: "客户数"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.barCode = this.$route.query.barCode;
      if (!this.barCode) {
        let sessionbarCode = sessionStorage.getItem("barCode");

        if (sessionbarCode != null || sessionbarCode != undefined) {
          this.barCode = sessionbarCode;
        }
      }

      this.axios
        .get(
          "/v1/ProductTotalTendency/GetProductGroupSaleInfo?upc=" +
            this.barCode +
            "&days=180"
        )
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // console.log(response.data.data[0].CategorySale[0]);
          console.log(response);
          // this.tableData = response.data.data;
          // this.initGrid();
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
            "/productInfo?barCode=" + event.data.Barcode + "&daycount=180";
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
