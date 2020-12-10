<template>
  <div>
    <h3 class="titleView">浏览历史:</h3>
    <span
      v-for="(view, index) in viewList"
      :key="viewKeys[index]"
      class="cateListView"
      @dblclick="loadViewInfo(view)"
    >
      {{ index + 1 }} : {{ view.name }}
    </span>
  </div>
</template>

<script>
import shortId from "shortid";

export default {
  name: "HistoryView",
  data() {
    return {
      viewList: "",
      viewKeys: []
    };
  },
  created() {
    this.getView();
  },
  methods: {
    getView() {
      this.viewList = JSON.parse(window.sessionStorage.getItem("localhistory"));
      if (this.viewList) {
        this.viewList = this.viewList.reverse();
      }
      this.viewKeys = this.viewList.map(() => shortId.generate());
    },
    loadViewInfo(params) {
      switch (params.type) {
        case 1:
          window.location.href =
            "/productInfo?barCode=" + params.id + "&daycount=180";
          break;
        case 2:
          window.location.href = "/categoryInfo?categoryNameId=" + params.id;
          break;
        case 3:
          window.location.href = "/brandInfo?BrandId=" + params.id;
          break;
        case 4:
          window.location.href = "/styleInfo?style=" + params.name;
          break;
        case 5:
          window.location.href = "/modelInfo?model=" + params.name;
          break;
        case 6:
          window.location.href = "/customerInfo?customer=" + params.name;
          break;
        default:
      }
    }
  }
};
</script>

<style>
.cateListView {
  padding-left: 10px;
  padding-bottom: 10px;
  display: flex;
  width: 100%;
  overflow: hidden;
  text-align: left;
}

.cateListView:hover {
  text-decoration: underline;
  font-weight: 700;
}

.titleView {
  font-weight: 700;
  list-style: none;
  font-size: 18px;
  padding-bottom: 10px;
  text-align: left;
  padding-left: 10px;
}
</style>
