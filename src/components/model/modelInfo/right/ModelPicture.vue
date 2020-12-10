<template>
  <div>
    <h4 v-if="model">{{ model }}</h4>
    <div class="totalData">
      <h4>统计周期：180天</h4>
      <h4>累积销量：{{ salesVolume }}件</h4>
      <h4>累积销售额：{{ salesPrice | globalMoney }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelPicture",
  data() {
    return {
      model: "",
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
      this.model = this.$route.query.model;
      if (!this.model) {
        let sessionmodel = sessionStorage.getItem("model");

        if (sessionmodel != null || sessionmodel != undefined) {
          this.model = sessionmodel;
        }
      }

      this.axios
        .get("/v1/ModelDetail/GetModelSalesTotal?model=" + this.model)
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
