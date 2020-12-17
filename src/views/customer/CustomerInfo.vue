<template>
  <div class="con">
    <HistoryView class="left"></HistoryView>
    <div class="center">
      <CustomerInfoEcharts class="ModelInfoEcharts"></CustomerInfoEcharts>
      <CustomerProductTop class="ModelProductTop"></CustomerProductTop>
      <CustomerGrid class="CustomerGrid"></CustomerGrid>
    </div>
    <div class="right">
      <CustomerPicture></CustomerPicture>
    </div>
  </div>
</template>

<script>
import CustomerInfoEcharts from "@/components/customer/customerInfo/center/CustomerInfo";
import CustomerProductTop from "@/components/customer/customerInfo/center/CustomerProductTop";
import CustomerGrid from "@/components/customer/customerInfo/center/CustomerGrid";
import CustomerPicture from "@/components/customer/customerInfo/right/CustomerPicture";
import HistoryView from "@/components/publicCom/HistoryView";

export default {
  name: "CustomerInfo",
  components: {
    CustomerInfoEcharts,
    CustomerProductTop,
    CustomerGrid,
    CustomerPicture,
    HistoryView
  }
};
</script>

<style scoped>
.con {
  display: grid;
  grid-template-columns: 300px auto 300px;
  grid-template-rows: auto;
}
.left {
  border-right: 1px solid #000;
}
.right {
  border-left: 1px solid #000;
}

.ModelInfoEcharts {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.ModelProductTop {
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.CustomerGrid {
  position: relative;
}
</style>
