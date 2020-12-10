<template>
  <div>
    <div style="height:200px;padding:20px">
      <img v-if="url" :src="url" alt="暂无图片" />
    </div>
    <h4 v-if="categoryName">{{ categoryName }}</h4>
    <div class="totalData">
      <h4>统计周期：180天</h4>
      <h4>累积销量：{{ salesVolume }}件</h4>
      <h4>累积销售额：{{ salesPrice | globalMoney }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Picture",
  data() {
    return {
      url: "",
      categoryNameId: "",
      categoryName: "",
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
      this.GetcategoryNameId();
      this.GetcategoryName();
      this.url =
        "https://resource.2valor.com/images/menu/categorylogo/category_" +
        this.categoryNameId +
        ".png";

      this.axios
        .get(
          "/v1/CategoryDetail/GetCategorySalesTotal?categoryId=" +
            this.categoryNameId
        )
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
