<template>
  <div>
    <h4 v-if="customer">{{ customer }}</h4>
    <div class="totalData">
      <h4>统计周期：180天</h4>
      <h4>累积销量：{{ salesVolume }}件</h4>
      <h4>累积销售额：{{ salesPrice | globalMoney }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerPicture",
  data() {
    return {
      customer: "",
      salesVolume: "",
      salesPrice: ""
    };
  },
  watch: {},
  created() {
    this.getUrl();
  },
  methods: {
    getUrl() {
      this.customer = this.$route.query.customer;
      if (!this.customer) {
        let sessioncustomer = sessionStorage.getItem("customer");

        if (sessioncustomer != null || sessioncustomer != undefined) {
          this.customer = sessioncustomer;
        }
      }

      this.axios
        .get("/v1/CustomerInfo/GetCustomerSalesTotal?customer=" + this.customer)
        .then(response => {
          this.salesVolume = response.data.data[0].total;
          this.salesPrice = response.data.data[0].totalSales;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.totalData {
  padding-left: 20px;
}
.totalData h4 {
  text-align: left;
  font-weight: 500;
}
</style>
