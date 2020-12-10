<template>
  <div>
    <h3>在网产品销售一览表</h3>
    <p class="showData">（显示最近180天数据）</p>
    <el-button
      type="primary"
      icon="el-icon-download"
      class="downloadData"
      @click="download()"
      >下载</el-button
    >
    <div
      id="GridCategory"
      style="width: 100%;height: 400px;"
      class="ag-theme-balham"
    ></div>
  </div>
</template>

<script>
import $ from "jquery";
import json2csv from "json2csv";

export default {
  name: "BrandGrid",
  data() {
    return {
      BrandId: "",
      tableData: "",
      fields: [
        "ProductId",
        "Barcode",
        "AddDate",
        "totalQuantity",
        "totalPrice",
        "inventory",
        "totalCustomer",
        "totalOrder"
      ],
      columnsName: [
        {
          field: "ProductId",
          headerName: "产品ID",
          pinned: "left"
        },
        {
          field: "Barcode",
          headerName: "条形码"
        },
        {
          field: "AddDate",
          headerName: "挂网日期"
        },
        {
          field: "totalQuantity",
          headerName: "累积销量"
        },
        {
          field: "totalPrice",
          headerName: "累积销售额"
        },
        {
          field: "inventory",
          headerName: "库存量"
        },
        {
          field: "totalCustomer",
          headerName: "客户数"
        },
        {
          field: "totalOrder",
          headerName: "订单量"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.BrandId = this.$route.query.BrandId;
      if (!this.BrandId) {
        let sessionBrandId = sessionStorage.getItem("BrandId");

        if (sessionBrandId != null || sessionBrandId != undefined) {
          this.BrandId = sessionBrandId;
        }
      }

      this.axios
        .get("/v1/BrandDetail/GetBrandIdProductInfo?BrandId=" + this.BrandId)
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
            "/productInfo?barCode=" + event.data.Barcode + "&daycount=180";
        }
      };
      var eGridDiv = document.querySelector("#GridCategory");
      // eslint-disable-next-line no-undef
      new agGrid.Grid(eGridDiv, gridOptions);
    },
    download() {
      //tableData：数据，fields：字段名
      try {
        const result = json2csv.parse(this.tableData, {
          fields: this.fields
        });
        // 判断浏览器类型
        if (
          (navigator.userAgent.indexOf("compatible") > -1 &&
            navigator.userAgent.indexOf("MSIE") > -1) ||
          navigator.userAgent.indexOf("Edge") > -1
        ) {
          //IE10或Edge浏览器
          var BOM = "\uFEFF";
          var csvData = new Blob([BOM + result], { type: "text/csv" });
          navigator.msSaveBlob(csvData, `grid.csv`);
        } else {
          //非IE浏览器
          var csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
          //使用a标签的download属性实现下载功能
          var link = document.createElement("a");
          link.href = encodeURI(csvContent);
          link.download = `grid.csv`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (err) {
        alert(err);
      }
    }
  }
};
</script>

<style scoped>
.showData {
  margin: -15px 0 20px 0;
  font-size: 14px;
}

.downloadData {
  position: absolute;
  top: 10px;
  right: 20px;
  height: 30px;
  padding: 5px 10px;
}
</style>
