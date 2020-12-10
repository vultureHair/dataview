<template>
  <ul>
    <li class="titleStyle">按历史累积产品数量排名</li>
    <li
      v-for="(style, index) in styleList"
      :key="styleKeys[index]"
      class="cateListStyle"
      title=""
      @click="loadStyleInfo(style.Styletype)"
    >
      top{{ index + 1 }} :{{ style.Styletype }}--{{ style.total }}
    </li>
  </ul>
</template>

<script>
import shortId from "shortid";

export default {
  name: "StyleListInfo",
  data() {
    return {
      styleList: [],
      styleKeys: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    loadStyleInfo(params) {
      this.$router.push({
        path: "/styleInfo",
        query: { style: params }
      });
    },
    getData() {
      this.axios
        .get("/v1/StyletypeList/getStyleList")
        .then(response => {
          this.styleList = response.data.data;
          this.styleKeys = this.styleList.map(() => shortId.generate());
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.cateListStyle {
  list-style: none;
  padding-left: 20px;
  padding-bottom: 10px;
  display: inline-block;
  width: 50%;
  overflow: hidden;
}

.cateListStyle:hover {
  text-decoration: underline;
  font-weight: 700;
}

.titleStyle {
  font-weight: 700;
  list-style: none;
  font-size: 18px;
  padding-bottom: 10px;
}
</style>
