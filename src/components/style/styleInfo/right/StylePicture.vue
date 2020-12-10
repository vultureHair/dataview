<template>
  <div>
    <h4 v-if="style">{{ style }}</h4>
    <div class="totalData">
      <h4>统计周期：180天</h4>
      <h4>累积销量：{{ salesVolume }}件</h4>
      <h4>累积销售额：{{ salesPrice | globalMoney }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "StylePicture",
  data() {
    return {
      style: "",
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
      this.style = this.$route.query.style;
      if (!this.style) {
        let sessionstyle = sessionStorage.getItem("style");

        if (sessionstyle != null || sessionstyle != undefined) {
          this.style = sessionstyle;
        }
      }

      this.axios
        .get("/v1/StyleInfo/GetStyleSalesTotal?style=" + this.style)
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
