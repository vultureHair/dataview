<template>
  <div>
    <h3>产品列表一览表</h3>
    <div
      id="GridCenter"
      style="width: 100%;height: 300px;"
      class="ag-theme-balham"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      tableData: "",
      pid:
        "123730_123600_123601_123602_123460_123603_123604_123605_123606_123607_123532_123608_123609_123533_123735_123599_123450_123451_123452_123531_123453_123454_123455_123456_123457_123458_123280_123281_123459_123842_123843_123844_123845_123846_123931_123932_123933_123934_123286_123287_123381_123734_123793_123840_123841_123857_123022_123023_123024_123029_123030_123053_123054_123055_123056_123057_123058_123059_122783_122784",
      msgError: "",
      columnsName: [
        {
          field: "PId",
          headerName: "PID",
          pinned: "left"
        },
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
          headerName: "PName"
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
          field: "brand",
          headerName: "brand"
        },
        {
          field: "CategoryName",
          headerName: "CategoryName"
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

      if (sessionPid == null) {
        // this.pid = this.$route.query.product;
      } else {
        this.pid = sessionPid;
      }

      if (!this.pid) {
        this.tableData = "暂无数据";
      } else {
        this.axios
          .get("/v1/ProductDetail/getproductdetaillist?product=" + this.pid)
          .then(response => {
            console.log(response.data);
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
            "/productInfo?barCode=" + event.data.Barcode + "&daycount=180";
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
