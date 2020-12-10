<template>
  <div>
    <h3>客户累计购买详情</h3>
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
  name: "CustomerGrid",
  data() {
    return {
      customer: "",
      tableData: "",
      columnsName: [
        {
          field: "sil_No_",
          headerName: "产品二维码",
          pinned: "left"
        },
        {
          field: "totalValue",
          headerName: "累积购买数量"
        },
        {
          field: "totalPrice",
          headerName: "累积购买金额"
        },
        {
          field: "totalOrder",
          headerName: "累积下单量"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.customer = this.$route.query.customer;
      if (!this.customer) {
        let sessioncustomer = sessionStorage.getItem("customer");

        if (sessioncustomer != null || sessioncustomer != undefined) {
          this.customer = sessioncustomer;
        }
      }

      this.axios
        .get(
          "/v1/CustomerInfo/GetCustomerProductEverysales?customer=" +
            this.customer
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
          console.log(event.data);
          window.location.href =
            "/productInfo?barCode=" + event.data.sil_No_ + "&daycount=180";
        }
      };
      var eGridDiv = document.querySelector("#GridCategory");
      // eslint-disable-next-line no-undef
      new agGrid.Grid(eGridDiv, gridOptions);
    }
  }
};
</script>
