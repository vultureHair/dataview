<template>
  <div>
    <h3>产品一览表</h3>
    <div
      id="GridCenter"
      style="width: 3000px;height: 300px;"
      class="ag-theme-balham"
    ></div>
  </div>
</template>

<script>
export default {
  name: "productList",
  data() {
    return {
      tableData: "",
      pid: "",
      msgError: "",
      columnsName: [
        {
          field: "ProductId",
          headerName: "产品ID",
          pinned: "left"
        },
        {
          field: "Barcode",
          headerName: "Barcode",
          pinned: "left"
        },
        {
          field: "PName",
          headerName: "PName",
          width: 1000
        },
        {
          field: "inventory",
          headerName: "inventory"
        },
        {
          field: "ProductImgCount",
          headerName: "ProductImgCount"
        },
        {
          field: "SumTotalSalesAsDays",
          headerName: "SumTotalSalesAsDays"
        },
        {
          field: "AddDate",
          headerName: "AddDate"
        },
        {
          field: "OffDate",
          headerName: "OffDate"
        },
        {
          field: "coid",
          headerName: "coid"
        },
        {
          field: "company",
          headerName: "company"
        },
        {
          field: "pmid",
          headerName: "pmid"
        },
        {
          field: "model",
          headerName: "model"
        },
        {
          field: "BrandId",
          headerName: "BrandId"
        },
        {
          field: "brand",
          headerName: "brand"
        },
        {
          field: "CategoryName",
          headerName: "CategoryName"
        },
        {
          field: "CategoryNameId",
          headerName: "CategoryNameId"
        },
        {
          field: "Styletype",
          headerName: "Styletype"
        },
        {
          field: "Styletypename",
          headerName: "Styletypename"
        },
        {
          field: "Path",
          headerName: "Path"
        },
        {
          field: "Attribute",
          headerName: "Attribute"
        },
        {
          field: "price",
          headerName: "price"
        },
        {
          field: "universalmodel",
          headerName: "universalmodel"
        },
        {
          field: "Carrier",
          headerName: "Carrier"
        },
        {
          field: "storehouse",
          headerName: "storehouse"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pid = this.$route.query.product;
      if (!this.pid) {
        this.tableData = "暂无数据";
      } else {
        this.axios
          .get("/v1/ProductDetail/getproductdetaillist?product=" + this.pid)
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
        onRowDoubleClicked: function(event) {
          console.log(event.data.Barcode);
          window.open(
            "http://localhost:8080/#/productInfo?barCode=" +
              event.data.Barcode +
              "&daycount=180",
            "",
            "height=600,width=1000,scrollbars=yes,status=yes"
          );
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
  margin: 0 0 20px 0;
}
</style>
