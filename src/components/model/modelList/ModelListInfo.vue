<template>
  <ul>
    <li class="title">按历史累积产品数量排名</li>
    <li
      v-for="(model, index) in modelList"
      :key="modelKeys[index]"
      class="cateList"
      @click="loadModelInfo(model.model)"
    >
      top{{ index + 1 }} :{{ model.model }}--{{ model.total }}
    </li>
  </ul>
</template>

<script>
import shortId from "shortid";

export default {
  name: "ModelListInfo",
  data() {
    return {
      modelList: [],
      modelKeys: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    loadModelInfo(params) {
      this.$router.push({
        path: "/modelInfo",
        query: { model: params }
      });
    },
    getData() {
      this.axios
        .get("/v1/ModelList/getModelList")
        .then(response => {
          this.modelList = response.data.data;
          this.modelKeys = this.modelList.map(() => shortId.generate());
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.cateList {
  list-style: none;
  padding-left: 20px;
  padding-bottom: 10px;
  display: inline-block;
  width: 50%;
  overflow: hidden;
}

.cateList:hover {
  text-decoration: underline;
  font-weight: 700;
}

.title {
  font-weight: 700;
  list-style: none;
  font-size: 18px;
  padding-bottom: 10px;
}
</style>
