<template>
  <div>
    <h4>统计周期：180天</h4>
    <h4>条形码：{{ barCode }}</h4>
    <h4>累积销量：{{ salesVolume }}</h4>
    <h4>销售额：{{ salesPrice | globalMoney }}</h4>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      barCode: "",
      salesVolume: "",
      salesPrice: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.barCode = this.$route.query.barCode;

      if (!this.barCode) {
        let sessionBarcode = sessionStorage.getItem("barCode");

        if (sessionBarcode != null || sessionBarcode != undefined) {
          this.barCode = sessionBarcode;
        }
      }

      this.axios
        .get(
          "/v1/ProductDetail/GetProductDetailAmount?barCode=" +
            this.barCode
        )
        .then(response => {
          this.salesVolume = response.data.data[0].salesVolume;
          this.salesPrice = response.data.data[0].salesPrice;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
h4 {
  text-align: left;
  padding-left: 20px;
  font-weight: normal;
}
</style>
