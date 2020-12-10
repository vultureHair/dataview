<template>
  <ul>
    <li
      v-for="(Brand, index) in BrandList"
      :key="BrandKeys[index]"
      class="cateListBrand"
      @click="loadBrandInfo(Brand.BrandId)"
    >
      {{ Brand.brand }}
    </li>
  </ul>
</template>

<script>
import shortId from "shortid";
// import $ from "jquery";

export default {
  name: "BrandListInfo",
  data() {
    return {
      BrandList: [],
      BrandKeys: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    loadBrandInfo(params) {
      this.$router.push({
        path: "/brandInfo",
        query: { BrandId: params }
      });
    },
    getData() {
      this.axios
        .get("/v1/ProductDetail/getallbrand")
        .then(response => {
          this.BrandList = response.data.data;
          this.BrandKeys = this.BrandList.map(() => shortId.generate());
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.cateListBrand {
  list-style: decimal;
  padding-left: 20px;
  padding-bottom: 10px;
  float: left;
  width: 33%;
}

.cateListBrand:hover {
  text-decoration: underline;
  font-weight: 700;
}
</style>
