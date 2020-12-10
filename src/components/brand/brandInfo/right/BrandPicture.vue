<template>
  <div>
    <div style="height:120px;padding:20px">
      <img v-if="url" :src="url" alt="暂无图片" width="100%" />
    </div>
    <h4 v-if="brand">{{ brand }}</h4>
    <div class="totalData">
      <h4>统计周期：180天</h4>
      <h4>累积销量：{{ salesVolume }}件</h4>
      <h4>累积销售额：{{ salesPrice | globalMoney }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "BrandPicture",
  data() {
    return {
      url: "",
      BrandId: "",
      brand: "",
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
      this.BrandId = this.$route.query.BrandId;
      if (!this.BrandId) {
        let sessionBrandId = sessionStorage.getItem("BrandId");

        if (sessionBrandId != null || sessionBrandId != undefined) {
          this.BrandId = sessionBrandId;
        }
      }
      this.url =
        "https://resource.2valor.com/images/menu/brandlogo/300/brand_" +
        this.BrandId +
        ".png";

      this.axios
        .get("/v1/BrandDetail/GetBrandSalesTotal?BrandId=" + this.BrandId)
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
