<template>
  <div>
    <div style="height:200px;padding:20px">
      <img v-if="path" :src="path" alt="暂无图片" />
    </div>
    <h4 v-if="PName">{{ PName }}</h4>
  </div>
</template>

<script>
export default {
  name: "Picture",
  data() {
    return {
      path: "",
      PName: "",
      barCode: ""
    };
  },
  watch: {},
  created() {
    this.getImageUrl();
  },
  methods: {
    getImageUrl() {
      // 1. 从route中获取barCode
      // 2.若不存在，则从缓存中获取
      // 3.若仍不存在，则加载空表

      this.barCode = this.$route.query.barCode;

      if (!this.barCode) {
        let sessionBarcode = sessionStorage.getItem("barCode");

        if (sessionBarcode != null || sessionBarcode != undefined) {
          this.barCode = sessionBarcode;
        }
      }

      this.axios
        .get(
          "/v1/ProductDetail/GetProductDetailPicture?barCode=" +
            this.barCode
        )
        .then(response => {
          this.path = response.data.data[0].Path;
          this.PName = response.data.data[0].PName;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
